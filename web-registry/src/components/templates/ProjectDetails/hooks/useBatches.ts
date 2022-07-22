import { useState, useEffect } from 'react';
import { Maybe } from '../../../../generated/graphql';
import {
  getBatchesWithSupply,
  getBatchesTotal,
} from '../../../../lib/ecocredit/api';
import { getMetadata } from '../../../../lib/metadata-graph';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../../../types/ledger/ecocredit';

interface InputProps {
  creditClassId: Maybe<string> | undefined;
  vcsProjectId: number | undefined;
}
export default function useBatches({
  creditClassId,
  vcsProjectId,
}: InputProps) {
  const [batchData, setBatchData] = useState<BatchInfoWithSupply[]>([]);
  const [batchTotals, setBatchTotals] = useState<BatchTotalsForProject>();

  useEffect(() => {
    const asyncFilter = async (
      arr: BatchInfoWithSupply[],
      predicate: (batch: BatchInfoWithSupply) => Promise<boolean>,
    ): Promise<BatchInfoWithSupply[]> => {
      const results = await Promise.all(arr.map(predicate));
      return arr.filter((_v, index) => results[index]);
    };

    const fetch = async (): Promise<void> => {
      try {
        let batches: BatchInfoWithSupply[] = [];
        if (creditClassId) {
          const { data } = await getBatchesWithSupply(creditClassId);
          batches = data;
        }

        const filteredBatches = await asyncFilter(
          batches,
          async (batch: BatchInfoWithSupply) => {
            let batchMetadata;
            if (batch.metadata?.length) {
              batchMetadata = await getMetadata(batch.metadata);
            }
            return batchMetadata?.['regen:vcsProjectId'] === vcsProjectId;
          },
        );
        const { totals } = await getBatchesTotal(filteredBatches);
        setBatchData(filteredBatches);
        setBatchTotals(totals);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    };
    fetch();
  }, [creditClassId, vcsProjectId]);

  return { batchData, batchTotals };
}
