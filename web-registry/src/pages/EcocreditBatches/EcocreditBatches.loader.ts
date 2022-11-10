import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import {
  AllCreditClassDocument,
  AllCreditClassQuery,
} from 'generated/sanity-graphql';
import {
  addDataToBatch,
  EcocreditQueryClient,
  queryBatches,
} from 'lib/ecocredit/api';

import {
  AddDataToBatchesQueryLoaderResponse,
  AddDataToBatchLoaderParams,
  GetAllCreditClassesLoaderParams,
  GetAllCreditClassesLoaderResponse,
  QueryBatchesLoaderProps,
  QueryBatchesLoaderResponse,
} from './EcocreditBatches.types';

export const getBatchesQuery = ({
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

export const getAddDataToBatchesQuery = ({
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

export const getAllCreditClassesQuery = ({
  sanityClient,
}: GetAllCreditClassesLoaderParams): GetAllCreditClassesLoaderResponse => ({
  queryKey: ['AllCreditClassQuery'],
  queryFn: async () => {
    const { data: sanityCreditClassData } =
      await sanityClient.query<AllCreditClassQuery>({
        query: AllCreditClassDocument,
      });

    return sanityCreditClassData;
  },
});

type LoaderType = {
  queryClient: QueryClient;
  sanityClient: ApolloClient<NormalizedCacheObject>;
  ecocreditClientAsync: Promise<EcocreditQueryClient | undefined>;
};

export const ecocreditBatchesLoader =
  ({ queryClient, ecocreditClientAsync, sanityClient }: LoaderType) =>
  async () => {
    const ecocreditClient = await ecocreditClientAsync;

    const batchesQuery = getBatchesQuery({
      client: ecocreditClient,
      request: {},
    });
    const allCreditClassesQuery = getAllCreditClassesQuery({ sanityClient });

    const batches =
      queryClient.getQueryData<QueryBatchesResponse>(
        batchesQuery.queryKey ?? [],
      ) ?? (await queryClient.fetchQuery(batchesQuery));
    const allCreditClasses =
      queryClient.getQueryData<AllCreditClassQuery>(
        allCreditClassesQuery.queryKey,
      ) ?? (await queryClient.fetchQuery(allCreditClassesQuery));

    const addDataToBatchesQuery = getAddDataToBatchesQuery({
      batches: batches?.batches,
      sanityCreditClassData: allCreditClasses,
    });
    const batchesWithSupply =
      queryClient.getQueryData<AllCreditClassQuery>(
        addDataToBatchesQuery.queryKey ?? [],
      ) ?? queryClient.fetchQuery(addDataToBatchesQuery);

    return { batches, batchesWithSupply };
  };
