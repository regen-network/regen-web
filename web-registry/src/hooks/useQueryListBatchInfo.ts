import { useState, useEffect } from 'react';

import {
  QueryBatchInfoResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListBatchInfo(
  batchDenoms?: string[],
): QueryBatchInfoResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryBatchInfoResponse[]>();

  useEffect(() => {
    if (!api?.queryClient || queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient, queryClient]);

  useEffect(() => {
    if (!queryClient || !batchDenoms) return;
    async function fetchData(
      client: QueryClientImpl,
      batches: string[],
    ): Promise<void> {
      await Promise.all(
        batches.map(
          async (batchDenom: string) => await client.BatchInfo({ batchDenom }),
        ),
      ).then(setDataList);
    }

    fetchData(queryClient, batchDenoms);
  }, [queryClient, batchDenoms]);

  return dataList;
}
