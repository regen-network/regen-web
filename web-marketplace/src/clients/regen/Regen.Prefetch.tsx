import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getClient } from 'app/ApolloClient';

import { getHasPrefinanceProjectsQuery } from 'lib/queries/react-query/registry-server/getHasPrefinanceProjectsQuery/getHasPrefinanceProjectsQuery';

import { LayoutSharedComponents } from 'components/layout/Layout.SharedComponents';

import { RegenProviders } from './Regen.Providers';
import { COOKIE_LOCALE } from 'middleware';

type Props = {
  children: React.ReactNode;
};

export async function RegenPrefetch({ children }: Props) {
  const queryClient = new QueryClient();

  /**
   * Try-catch prevents build failures when static routes are pre-rendered during CI (API unavailable).
   * Falls back to client-side fetch via useHasPrefinanceProjects if prefetch fails.
   */
  try {
    const apolloClient = await getClient();
    const cookieStore = await cookies();
    const languageCode = cookieStore.get(COOKIE_LOCALE)?.value || 'en';

    await queryClient.prefetchQuery(
      getHasPrefinanceProjectsQuery({
        queryClient,
        apolloClient,
        languageCode,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console, lingui/no-unlocalized-strings
    console.warn('Failed to prefetch prefinance projects data:', error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RegenProviders>
        {children}
        <LayoutSharedComponents />
      </RegenProviders>
    </HydrationBoundary>
  );
}
