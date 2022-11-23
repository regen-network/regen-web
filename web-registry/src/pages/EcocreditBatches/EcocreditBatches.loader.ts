import { QueryBatchesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import { EcocreditQueryClient } from 'lib/ecocredit/api';
import { getBatchesQuery } from 'lib/queries/react-query/ecocredit/queries.ecocredit';

import { PAGINATED_BATCHES_ROWS_PER_PAGE } from 'hooks/batches/usePaginatedBatches';

type LoaderType = {
  queryClient: QueryClient;
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
