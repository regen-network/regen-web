import { useEffect, useState } from 'react';
import {
  QueryBatchResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListBatchInfo(
  batches?: string[],
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
    async function fetchData(): Promise<void> {
      if (queryClient && batches) {
        await Promise.all(
          batches.map(
            async (batchDenom: string) =>
              await queryClient.Batch({ batchDenom }),
          ),
        )
          .then(setDataList)
          .catch(e => {
            // eslint-disable-next-line
            console.error(e);
            setDataList([]);
          });
      }
    }

    fetchData();
  }, [queryClient, batches]);

  return dataList;
}
