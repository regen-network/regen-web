import { QueryBatchesResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import { getRPCQueryClient } from 'ledger';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { PAGINATED_BATCHES_ROWS_PER_PAGE } from 'hooks/batches/useFetchPaginatedBatches';

type LoaderType = {
  queryClient: QueryClient;
};

export const ecocreditBatchesLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    const rpcQueryClient = await getRPCQueryClient();
    const page = Number(params.page) - 1;

    const batchesQuery = getBatchesQuery({
      client: rpcQueryClient,
      request: {
        pagination: {
          offset: BigInt(page * PAGINATED_BATCHES_ROWS_PER_PAGE),
          limit: BigInt(PAGINATED_BATCHES_ROWS_PER_PAGE),
          countTotal: true,
          reverse: false,
          key: new Uint8Array(),
        },
      },
    });

    const batches = getFromCacheOrFetch<QueryBatchesResponse | void>({
      query: batchesQuery,
      reactQueryClient: queryClient,
    });

    return { batches };
  };
