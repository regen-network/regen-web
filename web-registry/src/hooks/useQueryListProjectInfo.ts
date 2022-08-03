import { useEffect, useState } from 'react';
import {
  QueryClientImpl,
  QueryProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

// is a wrapper for a batch of requests
export default function useQueryListProjectInfo(
  projectIds?: string[],
): QueryProjectResponse[] | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [dataList, setDataList] = useState<QueryProjectResponse[]>();

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient || !projectIds) return;

    async function fetchData(
      client: QueryClientImpl,
      projects: string[],
    ): Promise<void> {
      Promise.all(
        projects.map(
          async (projectId: string) => await client.Project({ projectId }),
        ),
      ).then(setDataList);
    }

    fetchData(queryClient, projectIds);
  }, [queryClient, projectIds]);

  return dataList;
}
