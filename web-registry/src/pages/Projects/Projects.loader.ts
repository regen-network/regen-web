import { QueryClient } from '@tanstack/react-query';

import { getEcocreditQueryClient } from 'lib/clients/ecocreditQueryClient';
import { getMarketplaceQueryClient } from 'lib/clients/marketplaceQueryClient';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtentedQuery } from 'lib/queries/react-query/marketplace/getSellOrdersExtentedQuery/getSellOrdersExtentedQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

type LoaderType = {
  queryClient: QueryClient;
};

export const projectsLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Clients
    const ecocreditClient = await getEcocreditQueryClient();
    const marketplaceClient = await getMarketplaceQueryClient();

    // Queries
    const projectsQuery = getProjectsQuery({
      client: ecocreditClient,
      request: {},
    });
    const sellOrdersQuery = getSellOrdersExtentedQuery({
      client: marketplaceClient,
      reactQueryClient: queryClient,
      request: {},
    });
    const simplePriceQuery = getSimplePriceQuery({});

    // Fetch or Cache

    // Mandatory data
    getFromCacheOrFetch({
      query: projectsQuery,
      reactQueryClient: queryClient,
    });
    // Optionnal data
    getFromCacheOrFetch({
      query: sellOrdersQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: simplePriceQuery,
      reactQueryClient: queryClient,
    });
    return {};
  };
