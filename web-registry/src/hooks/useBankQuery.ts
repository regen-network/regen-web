import { useState, useEffect, useCallback } from 'react';

// TODO: move query client creation to the ledger context ?
import { QueryClientImpl } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import { useLedger } from '../ledger';
import {
  // types
  BankQueryClient,
  BankQueryProps,
  // queries
  queryAllBalances,
  queryBalance,
  queryDenomMetadata,
  queryDenomsMetadata,
} from '../lib/bank';

// TODO - hook is still missing batch query functionality
// TODO - the hook is still missing lazy query functionality

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useBankQuery<T>({
  query,
  params,
}: BankQueryProps): QueryOutput<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<BankQueryClient>();

  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // TODO: see top of the file
  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, client]);

  const allBalances = useCallback(
    (client, params) => queryAllBalances({ client, request: params }),
    [],
  );

  const balance = useCallback(
    (client, params) => queryBalance({ client, request: params }),
    [],
  );

  const denomMetadata = useCallback(
    (client, params) => queryDenomMetadata({ client, request: params }),
    [],
  );

  const denomsMetadata = useCallback(
    (client, params) => queryDenomsMetadata({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    let response;

    setLoading(true);

    if (query === 'allBalances') {
      response = allBalances(client, params);
    }

    if (query === 'balance') {
      response = balance(client, params);
    }

    if (query === 'denomMetadata') {
      response = denomMetadata(client, params);
    }

    if (query === 'denomsMetadata') {
      response = denomsMetadata(client, params);
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
    allBalances,
    balance,
    denomMetadata,
    denomsMetadata,
  ]);

  return { data, loading, error };
}
