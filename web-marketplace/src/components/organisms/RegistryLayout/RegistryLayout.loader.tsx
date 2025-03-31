import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

import { ApolloClientFactory } from 'lib/clients/apolloClientFactory';
import { client as sanityClient } from 'lib/clients/sanity';
import { defaultLocale } from 'lib/i18n/i18n';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';
import { getAllSanityProjectsQuery } from 'lib/queries/react-query/sanity/getAllProjectsQuery/getAllProjectsQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

type LoaderType = {
  queryClient: QueryClient;
  apolloClientFactory: ApolloClientFactory;
};

export const registryLayoutLoader =
  ({ queryClient, apolloClientFactory }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Queries
    const allSanityProjectsQuery = getAllSanityProjectsQuery({
      sanityClient,
      languageCode: defaultLocale,
    });

    const allProjectsQuery = getAllProjectsQuery({
      client:
        apolloClientFactory.getClient() as ApolloClient<NormalizedCacheObject>,
      enabled: true,
      languageCode: defaultLocale,
    });

    // Fetch or Cache

    // Mandatory data
    await getFromCacheOrFetch({
      query: allSanityProjectsQuery,
      reactQueryClient: queryClient,
    });
    await getFromCacheOrFetch({
      query: allProjectsQuery,
      reactQueryClient: queryClient,
    });

    return {};
  };
