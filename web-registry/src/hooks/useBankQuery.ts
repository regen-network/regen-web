import { useState, useEffect, useCallback } from 'react';

// TODO: move query client creation to the ledger context ?
import { QueryClientImpl } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import { useLedger } from '../ledger';
import {
  // types
  BankQueryClient,
  BankQueryProps,
  BankQueryDTO,
  // functions
  queryBalance,
  queryDenomMetadata,
} from '../lib/bank';

//

type QueryOutput = {
  data: BankQueryDTO | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useBankQuery({
  queryName,
  params,
}: BankQueryProps): QueryOutput {
  const { api } = useLedger();
  const [client, setClient] = useState<BankQueryClient>();

  const [data, setData] = useState<BankQueryDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, client]);

  const balance = useCallback(
    (client, params) => queryBalance({ client, request: params }),
    [],
  );

  const denomMetadata = useCallback(
    (client, params) => queryDenomMetadata({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    let response;

    setLoading(true);

    if (queryName === 'balance') {
      response = balance(client, params);
    }

    if (queryName === 'denomMetadata') {
      response = denomMetadata(client, params);
    }

    if (response) {
      response
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [client, queryName, params, data, loading, error, balance, denomMetadata]);

  return { data, loading, error };
}
