import { useState, useEffect } from 'react';

import { QueryClientImpl as BankQueryClient } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryClientImpl as EcocreditQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { QueryClientImpl as BasketQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

// TODO: map clients and ledger queries here, hidding this details from business hooks
// TODO: Map the clients and queries here, so that the implementation details
// of the queries are transparent to business hooks. Instead, the hook would be called
// like this:
// ie. useQueryClient('basket', { basketDenom })
// ie. useQueryClient('denomMetadata', { denom: basketDenom })

type QueryClient = BankQueryClient | EcocreditQueryClient | BasketQueryClient;

type LedgerModule = 'bank' | 'ecocredit' | 'basket';

// TODO: generic type
type QueryParams = any;

// type LedgerQuery<P> = ({
//   client,
//   params,
// }: {
//   client: QueryClient;
//   params: QueryParams<P>;
// }) => Promise<any>;

// type LedgerQuery = ({
//   client,
//   params,
// }: {
//   client: QueryClient;
//   params: QueryParams;
// }) => Promise<any>;

// TODO: generic types
type LedgerQuery = ({ client, params }: any) => Promise<any>;

type InputQueryLedger = {
  module: LedgerModule;
  query: LedgerQuery;
  params?: QueryParams;
};

type OutputQueryLedger<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useQueryClient<T>({
  module,
  query,
  params,
}: InputQueryLedger): OutputQueryLedger<T> {
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
