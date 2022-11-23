import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';

import {
  AllCreditClassQuery,
  AllHomePageQuery,
} from 'generated/sanity-graphql';
import { getEcocreditQueryClient } from 'lib/clients/ecocreditQueryClient';
import { getMarketplaceQueryClient } from 'lib/clients/marketplaceQueryClient';
import { FetchSimplePriceResponse } from 'lib/coingecko';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getSellOrdersQuery } from 'lib/queries/react-query/marketplace/getSellOrdersQuery/getSellOrdersQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { getFromCacheOrFetchUnresolved } from 'lib/queries/react-query/utils/getFromCacheOrFetchUnresolved';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { client as sanityClient } from '../../sanity';

type LoaderType = {
  queryClient: QueryClient;
};

export const homeLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Clients
    const ecocreditClient = await getEcocreditQueryClient();
    const marketplaceClient = await getMarketplaceQueryClient();

    // Queries
    const allHomePageQuery = getAllHomePageQuery({ sanityClient });
    const allCreditClassesQuery = getAllCreditClassesQuery({ sanityClient });
    const simplePriceQuery = getSimplePriceQuery({});
    const projectsQuery = getProjectsQuery({
      client: ecocreditClient,
      request: {},
    });
    const sellOrdersQuery = getSellOrdersQuery({
      client: marketplaceClient,
      reactQueryClient: queryClient,
      request: {},
    });

    // Fetch or Cache

    // Mandatory data
    const allHomePageData = await getFromCacheOrFetch<AllHomePageQuery>({
      query: allHomePageQuery,
      reactQueryClient: queryClient,
    });

    // Optionnal data
    const allCreditClassData = getFromCacheOrFetch<AllCreditClassQuery>({
      query: allCreditClassesQuery,
      reactQueryClient: queryClient,
    });
    const projects = getFromCacheOrFetch<QueryProjectsResponse | void>({
      query: projectsQuery,
      reactQueryClient: queryClient,
    });
    const sellOrders = getFromCacheOrFetch<SellOrderInfoExtented[] | undefined>(
      {
        query: sellOrdersQuery,
        reactQueryClient: queryClient,
      },
    );
    const simplePrice = getFromCacheOrFetch<FetchSimplePriceResponse>({
      query: simplePriceQuery,
      reactQueryClient: queryClient,
    });

    return {
      allHomePageData,
      allCreditClassData,
      projects,
      sellOrders,
      simplePrice,
    };
  };
