import { useState, useEffect } from 'react';

import { QueryClientImpl as BankQueryClient } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryClientImpl as EcocreditQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { QueryClientImpl as BasketQueryClient } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

// TODO: map clients and ledger queries here, hidding this details from business hooks
// TODO: Map the clients and queries here, so that the implementation details
// of the queries are transparent to business hooks. Instead, the hook would be called
// like this:
// ie. useQueryLedger('basket', { basketDenom })
// ie. useQueryLedger('denomMetadata', { denom: basketDenom })

type QueryClient = BankQueryClient | EcocreditQueryClient | BasketQueryClient;

type LedgerModules = 'bank' | 'ecocredit' | 'basket';

// TODO: generic type
type LedgerQueryParams = any;

// type LedgerQuery<P> = ({
//   client,
//   params,
// }: {
//   client: QueryClient;
//   params: LedgerQueryParams<P>;
// }) => Promise<any>;

// type LedgerQuery = ({
//   client,
//   params,
// }: {
//   client: QueryClient;
//   params: LedgerQueryParams;
// }) => Promise<any>;

// TODO: generic types
type LedgerQuery = ({ client, params }: any) => Promise<any>;

type InputQueryLedger = {
  queryType: LedgerModules;
  queryCallback: LedgerQuery;
  queryParams?: LedgerQueryParams;
};

type OutputQueryLedger<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useQueryLedger<T>({
  queryType,
  queryCallback,
  queryParams,
}: InputQueryLedger): OutputQueryLedger<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<QueryClient>();

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;

    switch (queryType) {
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
        break;
    }
  }, [api?.queryClient, client, queryType]);

  useEffect(() => {
    if (!client) return;
    if (!queryType || !queryCallback || !queryParams) return;
    if (loading || data) return;

    setLoading(true);

    queryCallback({
      client,
      ...queryParams,
      // params: queryParams,
    })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [client, queryType, queryCallback, queryParams, loading, data]);

  return { data, loading, error };
}
