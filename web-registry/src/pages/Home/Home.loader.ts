import { QueryClient } from '@tanstack/react-query';

import { AllHomePageQuery } from 'generated/sanity-graphql';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { client as sanityClient } from '../../sanity';

type LoaderType = {
  queryClient: QueryClient;
};

export const homeLoader =
  ({ queryClient }: LoaderType) =>
  async ({ params }: { params: any }) => {
    // Queries
    const allHomePageQuery = getAllHomePageQuery({ sanityClient });

    // Fetch or Cache
    const allHomePageData = await getFromCacheOrFetch<AllHomePageQuery>({
      query: allHomePageQuery,
      reactQueryClient: queryClient,
    });

    return {
      allHomePageData,
    };
  };
