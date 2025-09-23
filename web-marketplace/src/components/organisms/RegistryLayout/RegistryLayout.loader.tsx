import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/apolloSanity';

import { fetchHasPrefinanceProjects } from './prefinance';

type LoaderType = {
  queryClient: QueryClient;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
};

/**
 * Loader function for the main app layout that checks if there are
 * prefinance projects so we can show or hide the corresponding menu item.
 * Returns true if there are one or more prefinance project(s).
 */
export const registryLayoutLoader =
  ({ queryClient, apolloClient, languageCode }: LoaderType) =>
  async () => {
    return fetchHasPrefinanceProjects({
      queryClient,
      apolloClient,
      languageCode,
    });
  };
