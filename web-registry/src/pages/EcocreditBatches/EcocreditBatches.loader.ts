import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import {
  addDataToBatch,
  AddDataToBatchParams,
  EcocreditQueryClient,
  queryBatches,
  QueryBatchesProps,
} from 'lib/ecocredit/api';

type BatchesQueryType = {
  queryKey: string[];
  queryFn: () => Promise<QueryBatchesResponse>;
};

type AddDataToBatchesQueryType = {
  queryKey: string[];
  queryFn: () => Promise<BatchInfoWithSupply[]>;
};

export const batchesQuery = ({
  client,
  request,
}: QueryBatchesProps): BatchesQueryType => ({
  queryKey: [
    'batches',
    String(request.pagination?.offset ?? 0),
    String(request.pagination?.limit ?? 0),
  ],
  queryFn: async () => {
    const batches = await queryBatches({ client, request });

    return batches;
  },
});

export const addDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
}: AddDataToBatchParams): AddDataToBatchesQueryType => ({
  queryKey: ['addDataTobatches', batches.map(batch => batch.denom).join(',')],
  queryFn: async () => {
    const batchesWithSupply = await addDataToBatch({
      batches,
      sanityCreditClassData,
    });

    return batchesWithSupply;
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
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
