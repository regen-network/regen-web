import { QueryClient } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { getEcocreditQueryClient } from 'lib/clients/regen/ecocredit/ecocreditQueryClient';
import { getMarketplaceQueryClient } from 'lib/clients/regen/ecocredit/marketplace/marketplaceQueryClient';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllProjectPageQuery } from 'lib/queries/react-query/sanity/getAllProjectPageQuery/getAllProjectPageQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { client as sanityClient } from '../../../lib/clients/sanity';
import { getIsOnChainId } from './ProjectDetails.utils';
import { getAllSanityPrefinanceProjectsQuery } from 'lib/queries/react-query/sanity/getAllPrefinanceProjectsQuery/getAllPrefinanceProjectsQuery';

type LoaderType = {
  queryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const projectDetailsLoader =
  ({ queryClient, apolloClientFactory }: LoaderType) =>
  async ({ params: { projectId } }: { params: { projectId?: string } }) => {
    // Params
    const isOnChainId = getIsOnChainId(projectId);

    // Clients
    const marketplaceClient = await getMarketplaceQueryClient();
    const ecocreditClient = await getEcocreditQueryClient();

    // Queries
    const allProjectPageQuery = getAllProjectPageQuery({ sanityClient });
    const allSanityPrefinanceProjectsQuery =
      getAllSanityPrefinanceProjectsQuery({
        sanityClient,
      });
    const allCreditClassesQuery = getAllSanityCreditClassesQuery({
      sanityClient,
    });
    const projectQuery = getProjectQuery({
      request: { projectId },
      client: ecocreditClient,
    });
    const projectByOnChainIdQuery = getProjectByOnChainIdQuery({
      client: apolloClientFactory.getClient(),
      enabled: !!projectId && isOnChainId,
      onChainId: projectId ?? '',
    });
    const projectBySlugQuery = getProjectBySlugQuery({
      client: apolloClientFactory.getClient(),
      enabled: !!projectId && !isOnChainId,
      slug: projectId as string,
    });

    const sellOrdersQuery = getSellOrdersExtendedQuery({
      client: marketplaceClient,
      reactQueryClient: queryClient,
      request: {},
    });
    const allowedDenomQuery = getAllowedDenomQuery({
      client: marketplaceClient,
    });

    // Fetch or Cache

    // Mandatory data
    await getFromCacheOrFetch({
      query: projectQuery,
      reactQueryClient: queryClient,
    });
    await getFromCacheOrFetch({
      query: projectByOnChainIdQuery,
      reactQueryClient: queryClient,
    });
    await getFromCacheOrFetch({
      query: projectBySlugQuery,
      reactQueryClient: queryClient,
    });

    // Optional data
    getFromCacheOrFetch({
      query: allProjectPageQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: allCreditClassesQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: allSanityPrefinanceProjectsQuery,
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

    return {};
  };
