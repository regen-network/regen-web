'use client';

import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getHasPrefinanceProjectsQuery } from 'lib/queries/react-query/registry-server/getHasPrefinanceProjectsQuery/getHasPrefinanceProjectsQuery';

export function useHasPrefinanceProjects(): boolean {
  const queryClient = useQueryClient();
  const apolloClient = useApolloClient();
  const languageCode = useAtomValue(selectedLanguageAtom);

  const { data } = useQuery(
    getHasPrefinanceProjectsQuery({
      queryClient,
      apolloClient: apolloClient as ApolloClient<NormalizedCacheObject>,
      languageCode,
    }),
  );

  return Boolean(data);
}
