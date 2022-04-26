import { useState, useEffect, useCallback } from 'react';

// TODO: move query client creation to the ledger context ?
import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';
import {
  // types
  BasketQueryClient,
  BasketQueryProps,
  // queries
  queryBasket,
  queryBasketBalances,
  queryBaskets,
  queryBasketBalance,
} from '../lib/basket';

// TODO - this hook is still missing batch query functionality
// TODO - this hook is still missing lazy query functionality

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useBasketQuery<T>({
  query,
  params,
}: BasketQueryProps): QueryOutput<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<BasketQueryClient>();

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // TODO: see top of the file
  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, client]);

  const basket = useCallback(
    (client, params) => queryBasket({ client, request: params }),
    [],
  );

  const baskets = useCallback(
    (client, params) => queryBaskets({ client, request: params }),
    [],
  );

  const basketBalances = useCallback(
    (client, params) => queryBasketBalances({ client, request: params }),
    [],
  );

  const basketBalance = useCallback(
    (client, params) => queryBasketBalance({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    let response;

    setLoading(true);

    if (query === 'basket') {
      response = basket(client, params);
    }

    if (query === 'baskets') {
      response = baskets(client, params);
    }

    if (query === 'basketBalances') {
      response = basketBalances(client, params);
    }

    if (query === 'basketBalance') {
      response = basketBalance(client, params);
    }

    if (response) {
      response
        .then(response => setData(response as T))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [
    client,
    query,
    params,
    data,
    loading,
    error,
    basket,
    baskets,
    basketBalances,
    basketBalance,
  ]);

  return { data, loading, error };
}
