import { useEffect, useState } from 'react';
import {
  QueryClassesResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

export default function useQueryListClasses():
  | QueryClassesResponse
  | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [classList, setClassList] = useState<QueryClassesResponse | undefined>(
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
      await client.Classes({}).then(setClassList);
    }

    fetchData(queryClient);
  }, [queryClient]);

  return classList;
}
