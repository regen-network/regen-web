import { QueryClient } from '@tanstack/react-query';

import {
  addDataToBatch,
  EcocreditQueryClient,
  queryBatches,
} from 'lib/ecocredit/api';

import {
  AddDataToBatchesQueryLoaderResponse,
  AddDataToBatchLoaderParams,
  QueryBatchesLoaderProps,
  QueryBatchesLoaderResponse,
} from './EcocreditBatches.types';

export const batchesQuery = ({
  client,
  request,
}: QueryBatchesLoaderProps): QueryBatchesLoaderResponse => ({
  queryKey: client && [
    'batches',
    String(request.pagination?.offset ?? 0),
    String(request.pagination?.limit ?? 0),
  ],
  queryFn: async () => {
    if (client) {
      const batches = await queryBatches({ client, request });

      return batches;
    }

    return undefined;
  },
});

export const addDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
}: AddDataToBatchLoaderParams): AddDataToBatchesQueryLoaderResponse => ({
  queryKey: batches && [
    'addDataTobatches',
    batches.map(batch => batch.denom).join(','),
  ],
  queryFn: async () => {
    if (batches) {
      const batchesWithSupply = await addDataToBatch({
        batches,
        sanityCreditClassData,
      });

      return batchesWithSupply;
    }

    return undefined;
  },
});

type LoaderType = {
  queryClient: QueryClient;
  ecocreditClient: EcocreditQueryClient;
};

export const ecocreditBatchesLoader =
  ({ queryClient, ecocreditClient }: LoaderType) =>
  async () => {
    const query = batchesQuery({ client: ecocreditClient, request: {} });
    return (
      queryClient.getQueryData(query.queryKey ?? []) ??
      (await queryClient.fetchQuery(query))
    );
  };
