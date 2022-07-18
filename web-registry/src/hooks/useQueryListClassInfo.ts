import { useState, useEffect } from 'react';

import {
  QueryClientImpl,
  QueryClassInfoResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListClassInfo(
  classes?: string[],
): QueryClassInfoResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryClassInfoResponse[]>();

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient || !classes) return;

    async function fetchData(
      client: QueryClientImpl,
      classes: string[],
    ): Promise<void> {
      Promise.all(
        classes.map(
          async (classId: string) => await client.ClassInfo({ classId }),
        ),
      ).then(setDataList);
    }

    fetchData(queryClient, classes);
  }, [queryClient, classes]);

  return dataList;
}
