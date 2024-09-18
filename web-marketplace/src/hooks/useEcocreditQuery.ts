import { useCallback, useEffect, useState } from 'react';
// TODO: move query client creation to the ledger context ?
import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';
import {
  // types
  EcocreditQueryClient,
  EcocreditQueryProps,
  EcocreditQueryResponse,
  // queries
  queryBalance,
  queryBalances,
  queryBatches,
  queryBatchesByClass,
  queryBatchesByIssuer,
  queryBatchesByProject,
  queryBatchInfo,
  queryClasses,
  queryClassInfo,
  queryCreditTypes,
  queryParams,
  queryProject,
  queryProjects,
  queryProjectsByAdmin,
  queryProjectsByClass,
} from '../lib/ecocredit/api';

// TODO - this hook is still missing batch query functionality
// TODO - this hook is still missing lazy query functionality

type QueryOutput<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function useEcocreditQuery<T extends EcocreditQueryResponse>({
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
    (client: any, params: any) => queryBalance({ client, request: params }),
    [],
  );

  const balances = useCallback(
    (client: any, params: any) => queryBalances({ client, request: params }),
    [],
  );

  const batchInfo = useCallback(
    (client: any, params: any) => queryBatchInfo({ client, request: params }),
    [],
  );

  const batches = useCallback(
    (client: any, params: any) => queryBatches({ client, request: params }),
    [],
  );

  const batchesByClass = useCallback(
    (client: any, params: any) =>
      queryBatchesByClass({ client, request: params }),
    [],
  );

  const batchesByProject = useCallback(
    (client: any, params: any) =>
      queryBatchesByProject({ client, request: params }),

    [],
  );

  const batchesByIssuer = useCallback(
    (client: any, params: any) =>
      queryBatchesByIssuer({ client, request: params }),
    [],
  );

  const classInfo = useCallback(
    (client: any, params: any) => queryClassInfo({ client, request: params }),
    [],
  );

  const classes = useCallback(
    (client: any, params: any) => queryClasses({ client, request: params }),
    [],
  );

  const creditTypes = useCallback(
    (client: any, params: any) => queryCreditTypes({ client, request: params }),
    [],
  );

  const paramsQuery = useCallback(
    (client: any, params: any) => queryParams({ request: params }),
    [],
  );

  const projects = useCallback(
    (client: any, params: any) => queryProjects({ client, request: params }),
    [],
  );

  const projectsByAdmin = useCallback(
    (client: any, params: any) =>
      queryProjectsByAdmin({ client, request: params }),
    [],
  );

  const projectsByClass = useCallback(
    (client: any, params: any) =>
      queryProjectsByClass({ client, request: params }),
    [],
  );

  const project = useCallback(
    (client: any, params: any) => queryProject({ client, request: params }),
    [],
  );

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (loading || data || error) return;

    setLoading(true);

    let response;
    switch (query) {
      case 'balance':
        response = balance(client, params);
        break;
      case 'balances':
        response = balances(client, params);
        break;
      case 'batchInfo':
        response = batchInfo(client, params);
        break;
      case 'batches':
        response = batches(client, params);
        break;
      case 'batchesByClass':
        response = batchesByClass(client, params);
        break;
      case 'batchesByProject':
        response = batchesByProject(client, params);
        break;
      case 'batchesByIssuer':
        response = batchesByIssuer(client, params);
        break;
      case 'classInfo':
        response = classInfo(client, params);
        break;
      case 'classes':
        response = classes(client, params);
        break;
      case 'creditTypes':
        response = creditTypes(client, params);
        break;
      case 'params':
        response = paramsQuery(client, params);
        break;
      case 'projects':
        response = projects(client, params);
        break;
      case 'projectsByAdmin':
        response = projectsByAdmin(client, params);
        break;
      case 'projectsByClass':
        response = projectsByClass(client, params);
        break;
      case 'project':
        response = project(client, params);
        break;
      default:
        setError(
          new Error(
            // eslint-disable-next-line lingui/no-unlocalized-strings
            'You need to provide a valid ecocredit query name (ie. batchInfo)',
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
  }, [
    client,
    query,
    params,
    data,
    loading,
    error,
    balance,
    balances,
    batchInfo,
    batches,
    batchesByClass,
    classInfo,
    classes,
    creditTypes,
    paramsQuery,
    projects,
    projectsByAdmin,
    projectsByClass,
    project,
    batchesByProject,
    batchesByIssuer,
  ]);

  return { data, loading, error };
}
