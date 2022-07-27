import { useEffect, useState } from 'react';
import {
<<<<<<< HEAD
  QueryClassResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
=======
  QueryClassInfoResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListClassInfo(
  classes?: string[],
): QueryClassResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryClassResponse[]>();

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
        classes.map(async (classId: string) => await client.Class({ classId })),
      ).then(setDataList);
    }

    fetchData(queryClient, classes);
  }, [queryClient, classes]);

  return dataList;
}
