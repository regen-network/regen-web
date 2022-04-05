import { useState, useEffect } from 'react';

import {
  QueryDenomMetadataResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import { useLedger } from '../ledger';

export default function useQueryDenomMetadata(
  denom?: string,
): QueryDenomMetadataResponse | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [data, setData] = useState<QueryDenomMetadataResponse>();

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient || !denom) return;

    queryClient
      .DenomMetadata({ denom })
      .then(setData)
      /* eslint-disable */
      .catch(console.error);
  }, [queryClient, denom]);

  return data;
}
