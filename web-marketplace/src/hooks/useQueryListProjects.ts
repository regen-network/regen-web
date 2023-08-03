import { useEffect, useState } from 'react';
import {
  QueryClientImpl,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

export default function useQueryListProjects():
  | QueryProjectsResponse
  | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [projectList, setProjectList] = useState<
    QueryProjectsResponse | undefined
  >(undefined);

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    async function fetchData(client: QueryClientImpl): Promise<void> {
      await client.Projects({}).then(setProjectList);
    }

    fetchData(queryClient);
  }, [queryClient]);

  return projectList;
}
