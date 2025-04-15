import { QueryClient } from '@tanstack/react-query';

import { getRPCQueryClient } from 'ledger';
import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { defaultLocale } from 'lib/i18n/i18n';
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

type LoaderType = {
  queryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const projectDetailsLoader =
  ({ queryClient, apolloClientFactory }: LoaderType) =>
  async ({ params: { projectId } }: { params: { projectId?: string } }) => {
    // Params
    const isOnChainId = getIsOnChainId(projectId);

    // Query client
    const rpcQueryClient = await getRPCQueryClient();

    // Queries
    const allProjectPageQuery = getAllProjectPageQuery({
      sanityClient,
      languageCode: defaultLocale,
    });
    const allCreditClassesQuery = getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: defaultLocale,
    });
    const projectQuery = getProjectQuery({
      enabled: !!projectId && !!queryClient,
      request: { projectId: projectId as string },
      client: rpcQueryClient,
    });
    const projectByOnChainIdQuery = getProjectByOnChainIdQuery({
      client: apolloClientFactory.getClient(),
      enabled: !!projectId && isOnChainId,
      onChainId: projectId ?? '',
      languageCode: defaultLocale,
    });
    const projectBySlugQuery = getProjectBySlugQuery({
      client: apolloClientFactory.getClient(),
      enabled: !!projectId && !isOnChainId,
      slug: projectId as string,
      languageCode: defaultLocale,
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
      query: sellOrdersQuery,
      reactQueryClient: queryClient,
    });
    getFromCacheOrFetch({
      query: allowedDenomQuery,
      reactQueryClient: queryClient,
    });

    return {};
  };
