import { useState, useEffect, useCallback } from 'react';

// TODO: move query client creation to the ledger context ?
import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';

import { useLedger } from '../ledger';
import {
  // types
  EcocreditQueryClient,
  EcocreditQueryProps,
  // queries
  queryBalance,
  queryBatchInfo,
  queryBatches,
  queryClassInfo,
  queryClasses,
  queryCreditTypes,
} from '../lib/ecocredit';

// TODO - this hook is still missing batch query functionality
// TODO - this hook is still missing lazy query functionality

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useEcocreditQuery<T>({
  query,
  params,
}: EcocreditQueryProps): QueryOutput<T> {
  const { api } = useLedger();
  const [client, setClient] = useState<EcocreditQueryClient>();

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // TODO: see top of the file
  useEffect(() => {
    if (!api?.queryClient) return;
    if (client) return;
    setClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, client]);

  const balance = useCallback(
    (client, params) => queryBalance({ client, request: params }),
    [],
  );

  const batchInfo = useCallback(
    (client, params) => queryBatchInfo({ client, request: params }),
    [],
  );

  const batches = useCallback(
    (client, params) => queryBatches({ client, request: params }),
    [],
  );

  const classInfo = useCallback(
    (client, params) => queryClassInfo({ client, request: params }),
    [],
  );

  const classes = useCallback(
    (client, params) => queryClasses({ client, request: params }),
    [],
  );

  const creditTypes = useCallback(
    (client, params) => queryCreditTypes({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    let response;

    setLoading(true);

    if (query === 'balance') {
      response = balance(client, params);
    }

    if (query === 'batchInfo') {
      response = batchInfo(client, params);
    }

    if (query === 'batches') {
      response = batches(client, params);
    }

    if (query === 'classInfo') {
      response = classInfo(client, params);
    }

    if (query === 'classes') {
      response = classes(client, params);
    }

    if (query === 'creditTypes') {
      response = creditTypes(client, params);
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
    balance,
    batchInfo,
    batches,
    classInfo,
    classes,
    creditTypes,
  ]);

  return { data, loading, error };
}
