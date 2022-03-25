import { useState, useEffect, useCallback } from 'react';

import {
  QueryClientImpl,
  QueryClassInfoResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { useLedger } from '../ledger';

type FetchClassInfo = (
  classId: string,
) => Promise<QueryClassInfoResponse | undefined>;

export default function useQueryClassInfo(): FetchClassInfo {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;

    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  const fetchClassInfo = useCallback(
    async classId => {
      if (!queryClient) return;
      return await queryClient.ClassInfo({ classId });
    },
    // async classId => {
    //   if (!queryClient) return;

    //   try {
    //     const metadata = await queryClient.ClassInfo({ classId });
    //     return metadata;
    //   } catch (err) {
    //     console.error(err); // eslint-disable-line no-console
    //   }

    //   return;
    // },
    [queryClient],
  );

  return fetchClassInfo;
}
