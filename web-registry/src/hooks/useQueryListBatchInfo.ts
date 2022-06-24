import { useState, useEffect } from 'react';

import {
  QueryBatchResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListBatchInfo(
  basketBatches?: string[],
): QueryBatchResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryBatchResponse[]>();

  useEffect(() => {
    if (!api?.queryClient || queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient, queryClient]);

  useEffect(() => {
    if (!queryClient || !basketBatches) return;
    async function fetchData(
      client: QueryClientImpl,
      batches: string[],
    ): Promise<void> {
      await Promise.all(
        batches.map(
          async (batchDenom: string) => await client.Batch({ batchDenom }),
        ),
      ).then(setDataList);
    }

    fetchData(queryClient, basketBatches);
  }, [queryClient, basketBatches]);

  return dataList;
}
