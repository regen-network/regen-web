import { useEffect, useState } from 'react';
import {
  QueryClassesResponse,
<<<<<<< HEAD
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
=======
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

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
