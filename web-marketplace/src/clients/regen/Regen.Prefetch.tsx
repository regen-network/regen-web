import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getClient } from 'app/ApolloClient';

import { getHasPrefinanceProjectsQuery } from 'lib/queries/react-query/registry-server/getHasPrefinanceProjectsQuery/getHasPrefinanceProjectsQuery';

import { RegenProviders } from './Regen.Providers';

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
    const languageCode = 'en'; // TODO: get user language from cookies/url segment

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
      <RegenProviders>{children}</RegenProviders>
    </HydrationBoundary>
  );
}
