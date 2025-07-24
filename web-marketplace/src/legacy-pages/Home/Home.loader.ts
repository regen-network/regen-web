import { QueryClient } from '@tanstack/react-query';
import { getRPCQueryClient } from 'app/makeRPCQueryClient';

import { defaultLocale } from 'lib/i18n/i18n';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { client as sanityClient } from '../../lib/clients/apolloSanity';

type LoaderType = {
  queryClient: QueryClient;
};

export const homeLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // RPC Query client
    const rpcQueryClient = await getRPCQueryClient();

    // Queries
    const allHomePageQuery = getAllHomePageQuery({
      sanityClient,
      languageCode: defaultLocale,
    });
    const allCreditClassesQuery = getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: defaultLocale,
    });
    const simplePriceQuery = getSimplePriceQuery({});
    const projectsQuery = getProjectsQuery({
      client: rpcQueryClient,
      request: {},
    });
    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: rpcQueryClient,
      reactQueryClient: queryClient,
      request: {},
    });
    const allowedDenomQuery = getAllowedDenomQuery({
      client: rpcQueryClient,
    });

    // Fetch or Cache

    // Mandatory data
    await getFromCacheOrFetch({
      query: allHomePageQuery,
      reactQueryClient: queryClient,
    });

    // Optional data
    getFromCacheOrFetch({
      query: allCreditClassesQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: projectsQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: sellOrdersQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: allowedDenomQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: simplePriceQuery,
      reactQueryClient: queryClient,
    });

    return {};
  };
