import { useEffect, useState } from 'react';
import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { addDataToBatch } from 'lib/ecocredit/api';

type Props = {
  batches?: BatchInfo[];
  paginationParams?: TablePaginationParams;
};

export const useBatchesWithSupply = ({
  batches,
  paginationParams,
}: Props): BatchInfoWithSupply[] | undefined => {
  const [batchesWithSupply, setBatchesWithSupply] = useState<
    BatchInfoWithSupply[] | undefined
  >();

  useEffect(() => {
    // Initialize batches with empty supply to render components consuming data right away
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
    // this variable is used to prevent race condition
    let ignore = false;
    const addSupplyToBatches = async (): Promise<void> => {
      // Fetch one page of batches
      if (batches && batchesWithSupply && paginationParams) {
        const { offset, rowsPerPage } = paginationParams;
        // current page batches
        const displayedBatches = batches.slice(offset, offset + rowsPerPage);
        try {
          // add supply to page batches
          const newBatchesWithData = await addDataToBatch(displayedBatches);
          if (!ignore) {
            // merge new batches into state variable
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
          console.error('error while fetching batch supply with pagination');
        }
      } else if (batches) {
        // Fetch all batches
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
      // Fetch only one page of batches if current page has at least one row without supply
      const { offset, rowsPerPage } = paginationParams;
      const displayedBatches = batchesWithSupply.slice(
        offset,
        offset + rowsPerPage,
      );
      shouldFetch = displayedBatches.some(batch => batch.tradableSupply === '');
    } else if (batchesWithSupply) {
      // Fetch all batches if at least one row without supply
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
