import { useEffect, useState } from 'react';
import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { OnActionTableChangeParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { addDataToBatch } from 'lib/ecocredit/api';

type Props = {
  batches?: BatchInfo[];
  paginationParams?: OnActionTableChangeParams;
};

export const useBatchesWithSupply = ({
  batches,
  paginationParams,
}: Props): BatchInfoWithSupply[] | undefined => {
  const [batchesWithSupply, setBatchesWithSupply] = useState<
    BatchInfoWithSupply[] | undefined
  >();
  useEffect(() => {
    if (batches && !batchesWithSupply) {
      const batchesWithDefaultSupply: BatchInfoWithSupply[] = batches.map(
        batch => ({
          ...batch,
          cancelledAmount: '',
          retiredSupply: '',
          tradableSupply: '',
        }),
      );
      setBatchesWithSupply(batchesWithDefaultSupply);
    }
  }, [batches, batchesWithSupply]);

  useEffect(() => {
    let ignore = false;
    const addSupplyToBatches = async (): Promise<void> => {
      if (batches && batchesWithSupply && paginationParams) {
        const { offset, rowsPerPage } = paginationParams;
        const displayedBatches = batches.slice(offset, offset + rowsPerPage);
        try {
          const newBatchesWithData = await addDataToBatch(displayedBatches);
          if (!ignore) {
            setBatchesWithSupply([
              ...batchesWithSupply.slice(0, offset),
              ...newBatchesWithData,
              ...batchesWithSupply.slice(
                offset + rowsPerPage,
                batchesWithSupply.length,
              ),
            ]);
          }
        } catch {
          // eslint-disable-next-line no-console
          console.error('error while fetching batch supply');
        }
      } else if (batches) {
        try {
          const batchesWithSupply = await addDataToBatch(batches);
          if (!ignore) {
            setBatchesWithSupply(batchesWithSupply);
          }
        } catch {
          // eslint-disable-next-line no-console
          console.error('error while fetching batch supply');
        }
      }
    };

    let shouldFetch = false;

    if (paginationParams && batchesWithSupply) {
      const { offset, rowsPerPage } = paginationParams;
      const displayedBatches = batchesWithSupply.slice(
        offset,
        offset + rowsPerPage,
      );
      shouldFetch = displayedBatches.some(batch => batch.tradableSupply === '');
    } else if (batchesWithSupply) {
      shouldFetch = batchesWithSupply.some(
        batch => batch.tradableSupply === '',
      );
    }

    if (shouldFetch) {
      addSupplyToBatches();
    }

    return () => {
      ignore = true;
    };
  }, [batches, batchesWithSupply, paginationParams]);

  return batchesWithSupply;
};
