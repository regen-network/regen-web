import { useState, useEffect, useCallback } from 'react';

import {
  QueryBatchInfoResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import { useLedger } from '../ledger';

// type Batch = {
//   batchDenom: string;
// };

type FetchBatchInfo = (
  batchDenom: string,
) => Promise<QueryBatchInfoResponse | undefined>;

export default function useQueryBatchInfo(): FetchBatchInfo {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;

    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  const fetchBatchInfo = useCallback(
    async batchDenom => {
      if (!queryClient) return;

      try {
        const batchInfo = await queryClient.BatchInfo({ batchDenom });
        return batchInfo;
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

      return;
    },
    [queryClient],
  );

  return fetchBatchInfo;
}
