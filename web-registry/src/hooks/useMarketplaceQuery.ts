import { useCallback, useEffect, useState } from 'react';
import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { useLedger } from '../ledger';
import { queryAllowedDenoms } from '../lib/ecocredit/marketplace/marketplace';
import {
  MarketplaceQueryClient,
  MarketplaceQueryParams,
  MarketplaceQueryResponse,
} from '../lib/ecocredit/marketplace/marketplace.types';

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useMarketplaceQuery<
  T extends MarketplaceQueryResponse,
>({ query, params }: MarketplaceQueryParams): QueryOutput<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<MarketplaceQueryClient>();

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, client]);

  const allowedDenoms = useCallback(
    (client, params) => queryAllowedDenoms({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    setLoading(true);

    let response;
    switch (query) {
      case 'allowedDenoms':
        response = allowedDenoms(client, params);
        break;
      default:
        setError(
          new Error(
            'You need to provide a valid marketplace query name (ie. batchInfo)',
          ),
        );
        setLoading(false);
        break;
    }

    if (response) {
      response
        .then(response => setData(response as T))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [client, query, params, data, loading, error, allowedDenoms]);

  return { data, loading, error };
}
