import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

import { fetchHasPrefinanceProjects } from 'components/organisms/RegistryLayout/prefinance';

import { getHasPrefinanceProjectsQueryKey } from './getHasPrefinanceProjectsQuery.utils';

type ReactQueryGetHasPrefinanceProjectsQueryParams = {
  queryClient: QueryClient;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
  enabled?: boolean;
};

export const getHasPrefinanceProjectsQuery = ({
  queryClient,
  apolloClient,
  languageCode,
  enabled = true,
}: ReactQueryGetHasPrefinanceProjectsQueryParams) => ({
  queryKey: getHasPrefinanceProjectsQueryKey({ languageCode }),
  queryFn: async () =>
    fetchHasPrefinanceProjects({
      queryClient,
      apolloClient,
      languageCode,
    }),
  enabled,
  staleTime: Infinity,
});
