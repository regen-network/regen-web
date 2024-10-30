import { QueryClient } from '@tanstack/react-query';

import { getEcocreditQueryClient } from 'lib/clients/regen/ecocredit/ecocreditQueryClient';
import { getMarketplaceQueryClient } from 'lib/clients/regen/ecocredit/marketplace/marketplaceQueryClient';
import { defaultLocale } from 'lib/i18n/i18n';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { client as sanityClient } from '../../../lib/clients/sanity';

type LoaderType = {
  queryClient: QueryClient;
};

export const storefrontLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Clients
    const ecocreditClient = await getEcocreditQueryClient();
    const marketplaceClient = await getMarketplaceQueryClient();

    // Queries
    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: marketplaceClient,
      reactQueryClient: queryClient,
      request: {},
    });
    const allCreditClassesQuery = getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: defaultLocale,
    });
    const projectsQuery = getProjectsQuery({
      client: ecocreditClient,
      request: {},
    });
    const allowedDenomQuery = getAllowedDenomQuery({
      client: marketplaceClient,
    });
    const simplePriceQuery = getSimplePriceQuery({});

    // Fetch or Cache

    // Mandatory data
    await getFromCacheOrFetch({
      query: sellOrdersQuery,
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
      query: allowedDenomQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: simplePriceQuery,
      reactQueryClient: queryClient,
    });

    return {};
  };
