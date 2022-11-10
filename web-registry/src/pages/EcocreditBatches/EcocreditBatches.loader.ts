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

import { PAGINATED_BATCHES_ROWS_PER_PAGE } from 'hooks/batches/usePaginatedBatches';

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
  enabled,
}: QueryBatchesLoaderProps): QueryBatchesLoaderResponse => ({
  queryKey: [
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
  enabled,
  staleTime: Infinity,
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
  staleTime: Infinity,
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
  ({ queryClient, ecocreditClientAsync }: LoaderType) =>
  async ({ params }: { params: any }) => {
    const ecocreditClient = await ecocreditClientAsync;
    const page = Number(params.page) - 1;

    const batchesQuery = getBatchesQuery({
      client: ecocreditClient,
      request: {
        pagination: {
          offset: page * PAGINATED_BATCHES_ROWS_PER_PAGE,
          limit: PAGINATED_BATCHES_ROWS_PER_PAGE,
          countTotal: true,
        },
      },
      enabled: !!ecocreditClient,
    });

    const batches =
      queryClient.getQueryData<QueryBatchesResponse>(
        batchesQuery.queryKey ?? [],
      ) ?? (await queryClient.fetchQuery(batchesQuery));

    return { batches };
  };
