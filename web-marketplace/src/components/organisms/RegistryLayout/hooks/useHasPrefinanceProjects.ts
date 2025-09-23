'use client';

import { useApolloClient } from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import { fetchHasPrefinanceProjects } from '../prefinance';

export function useHasPrefinanceProjects(): boolean {
  const queryClient = useQueryClient();
  const apolloClient = useApolloClient();
  const languageCode = useAtomValue(selectedLanguageAtom);

  const { data } = useQuery({
    queryKey: ['has-prefinance-projects', languageCode],
    queryFn: () =>
      fetchHasPrefinanceProjects({
        queryClient,
        apolloClient,
        languageCode,
      }),
    staleTime: Infinity,
  });

  return Boolean(data);
}
