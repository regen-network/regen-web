import { useEffect, useState } from 'react';
import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { addDataToBatch } from 'lib/ecocredit/api';

type Props = {
  batches?: BatchInfo[];
};

export const useBatchesWithSupply = ({
  batches,
}: Props): BatchInfoWithSupply[] | undefined => {
  const [batchesWithSupply, setBatchesWithSupply] = useState<
    BatchInfoWithSupply[] | undefined
  >();

  useEffect(() => {
    let ignore = false;
    const addSupplyToBatches = async (): Promise<void> => {
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
      } else if (batches) {
        const batchesWithData = await addDataToBatch(batches);
        if (!ignore) {
          setBatchesWithSupply(batchesWithData);
        }
      }
    };

    addSupplyToBatches();

    return () => {
      ignore = true;
    };
  }, [batches, batchesWithSupply]);

  return batchesWithSupply;
};
