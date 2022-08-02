import { useState, useEffect } from 'react';

import {
  QueryBatchInfoResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListBatchInfo(
  basketBatches?: string[],
): QueryBatchInfoResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryBatchInfoResponse[]>();

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient || !basketBatches) return;

    async function fetchData(
      client: QueryClientImpl,
      batches: string[],
    ): Promise<void> {
      Promise.all(
        batches.map(
          async (batchDenom: string) => await client.BatchInfo({ batchDenom }),
        ),
      ).then(setDataList);
    }

    fetchData(queryClient, basketBatches);
  }, [queryClient, basketBatches]);

  return dataList;
}
