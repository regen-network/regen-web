import { QueryClient } from '@tanstack/react-query';

import { getRPCQueryClient } from 'ledger';
import { defaultLocale } from 'lib/i18n/i18n';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { client as sanityClient } from '../../../lib/clients/sanity';

type LoaderType = {
  queryClient: QueryClient;
};

export const projectsLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Query client
    const rpcQueryClient = await getRPCQueryClient();

    // Queries
    const projectsQuery = getProjectsQuery({
      client: rpcQueryClient,
      request: {},
    });
    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: rpcQueryClient,
      reactQueryClient: queryClient,
      request: {},
    });
    const simplePriceQuery = getSimplePriceQuery({});
    const allHomePageQuery = getAllHomePageQuery({
      sanityClient,
      languageCode: defaultLocale,
    });

    // Fetch or Cache

    // Mandatory data
    await getFromCacheOrFetch({
      query: projectsQuery,
      reactQueryClient: queryClient,
    });
    // Optional data
    getFromCacheOrFetch({
      query: sellOrdersQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: simplePriceQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: allHomePageQuery,
      reactQueryClient: queryClient,
    });
    return {};
  };
