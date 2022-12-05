import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import { getEcocreditQueryClient } from 'lib/clients/regen/ecocredit/ecocreditQueryClient';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/getBatchesQuery/getBatchesQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { PAGINATED_BATCHES_ROWS_PER_PAGE } from 'hooks/batches/usePaginatedBatches';

type LoaderType = {
  queryClient: QueryClient;
};

export const ecocreditBatchesLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    const ecocreditClient = await getEcocreditQueryClient();
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
    });

    const batches = getFromCacheOrFetch<QueryBatchesResponse | void>({
      query: batchesQuery,
      reactQueryClient: queryClient,
    });

    return { batches };
  };
