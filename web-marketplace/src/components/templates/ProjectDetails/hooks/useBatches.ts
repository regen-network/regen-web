import { useEffect, useState } from 'react';

import { Maybe } from '../../../../generated/graphql';
import { useLedger } from '../../../../ledger';
import {
  getBatchesByProjectWithSupply,
  getBatchesTotal,
} from '../../../../lib/ecocredit/api';
import {
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../../../types/ledger/ecocredit';

interface InputProps {
  projectId: Maybe<string> | undefined;
}
export default function useBatches({ projectId }: InputProps): {
  batchData: BatchInfoWithSupply[];
  batchTotals: BatchTotalsForProject | undefined;
} {
  const [batchData, setBatchData] = useState<BatchInfoWithSupply[]>([]);
  const [batchTotals, setBatchTotals] = useState<BatchTotalsForProject>();
  const { dataClient, ecocreditClient } = useLedger();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let batches: BatchInfoWithSupply[] = [];
        if (projectId) {
          const { data } = await getBatchesByProjectWithSupply(
            projectId,
            dataClient,
            ecocreditClient,
          );
          batches = data;
        }

        const { totals } = await getBatchesTotal(batches);
        setBatchData(batches);
        setBatchTotals(totals);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    };
    fetchData();
  }, [dataClient, ecocreditClient, projectId]);

  return { batchData, batchTotals };
}
