import { useState, useEffect, useCallback } from 'react';

import {
  QueryDenomMetadataResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import { useLedger } from '../ledger';

// TODO: Use useBankQuery instead.

type FetchDenomMetadata = (
  denom: string,
) => Promise<QueryDenomMetadataResponse | undefined>;

export default function useQueryDenomMetadata(): FetchDenomMetadata {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;

    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  const fetchDenomMetadata = useCallback(
    async denom => {
      if (!queryClient) return;

      try {
        const metadata = await queryClient.DenomMetadata({ denom });
        return metadata;
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

      return;
    },
    [queryClient],
  );

  return fetchDenomMetadata;
}
