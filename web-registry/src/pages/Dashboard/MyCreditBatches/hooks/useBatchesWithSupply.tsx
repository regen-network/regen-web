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
      if (batches && paginationParams) {
        const batchesWithDefaultSupply: BatchInfoWithSupply[] = batches.map(
          batch => ({
            ...batch,
            cancelledAmount: '',
            retiredSupply: '',
            tradableSupply: '',
          }),
        );

        const { offset, rowsPerPage } = paginationParams;

        const displayedBatches = batches.slice(offset, offset + rowsPerPage);
        const newBatchesWithData = await addDataToBatch(displayedBatches);
        setBatchesWithSupply([
          ...batchesWithDefaultSupply.slice(0, offset),
          ...newBatchesWithData,
          ...batchesWithDefaultSupply.slice(
            offset + rowsPerPage,
            batchesWithDefaultSupply.length,
          ),
        ]);
      } else if (batches) {
        const batchesWithSupply = await addDataToBatch(batches);
        if (!ignore) {
          setBatchesWithSupply(batchesWithSupply);
        }
      }
    };

    addSupplyToBatches();

    return () => {
      ignore = true;
    };
  }, [batches, paginationParams]);

  return batchesWithSupply;
};
