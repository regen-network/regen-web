import { useState, useEffect } from 'react';

import { QueryClientImpl as BankQueryClient } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryClientImpl as EcocreditQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { QueryClientImpl as BasketQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';
import { queryDenomMetadata, queryBalance } from '../lib/bank';
import { queryBasket, queryBasketBalances, queryBaskets } from '../lib/basket';

//

type QueryClient = BankQueryClient | EcocreditQueryClient | BasketQueryClient;

/**
 * Bank query hook
 *
 * ie. useQueryClient<···>('denomMetadata', { denom: basketDenom })
 */

type BankQuery = 'allBalances' | 'balance' | 'denomMetadata' | 'denomsMetadata';

export function useBankQuery<T>(
  queryName: BankQuery,
  params?: Params,
): QueryOutput<T> {
  const { data, loading, error } = useQueryClient<T>({
    module: 'bank',
    query: getQuery(queryName),
    params,
  });

  function getQuery(queryName: BankQuery): Query {
    switch (queryName) {
      case 'balance':
        return queryBalance;

      case 'denomMetadata':
        return queryDenomMetadata;

      default:
        throw new Error('The specified bank query does not exist');
    }
  }

  return { data, loading, error };
}

/**
 * Basket query hook
 *
 * ie. useQueryClient('', { denom: basketDenom })
 */

type BasketQuery = 'basket' | 'baskets' | 'basketBalances' | 'basketBalance';

export function useBasketQuery<T>(
  queryName: BasketQuery,
  params: Params,
): QueryOutput<T> {
  const { data, loading, error } = useQueryClient<T>({
    module: 'basket',
    query: getQuery(queryName),
    params,
  });

  function getQuery(queryName: BasketQuery): Query {
    switch (queryName) {
      case 'basket':
        return queryBasket;

      case 'baskets':
        return queryBaskets;

      case 'basketBalances':
        return queryBasketBalances;

      default:
        throw new Error('The specified basket query does not exist');
    }
  }

  return { data, loading, error };
}

/**
 *
 * Base ledger query client hook.
 *
 * @param InputQueryClient
 * @returns OutputQueryClient
 */

type Module = 'bank' | 'ecocredit' | 'basket';

// TODO: generic type
type Params = any;

// TODO: generic types
type Query = ({ client, params }: any) => Promise<any>;

type QueryInput = {
  module: Module;
  query: Query;
  params?: Params;
};

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

function useQueryClient<T>({
  module,
  query,
  params,
}: QueryInput): QueryOutput<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<QueryClient>();

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // TODO: move query clients creation / management (singletons)
  // to `LedgerProvider` accessible through the `useLedger` hook
  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;

    switch (module) {
      case 'bank':
        setClient(new BankQueryClient(api.queryClient));
        break;

      case 'ecocredit':
        setClient(new EcocreditQueryClient(api.queryClient));
        break;

      case 'basket':
        setClient(new BasketQueryClient(api.queryClient));
        break;

      default:
        throw new Error('The specified query client does not exist');
    }
  }, [api?.queryClient, client, module]);

  useEffect(() => {
    if (!client) return;
    if (!module || !query || !params) return;
    if (loading || data) return;

    setLoading(true);

    query({ client, ...params })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [client, module, query, params, loading, data]);

  return { data, loading, error };
}
