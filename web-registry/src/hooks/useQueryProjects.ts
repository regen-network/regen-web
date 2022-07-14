import { useState, useEffect } from 'react';

import {
  QueryClientImpl,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

export default function useQueryProjects(): QueryProjectsResponse | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [projects, setProjects] = useState<QueryProjectsResponse | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    async function fetchData(client: QueryClientImpl): Promise<void> {
      await client.Projects({}).then(setProjects);
    }

    fetchData(queryClient);
  }, [queryClient]);

  return projects;
}
