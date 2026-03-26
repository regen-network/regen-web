import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/apolloSanity';
import { getAllProjectsQuery as getAllOffchainProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';
import { getAllSanityProjectsQuery } from 'lib/queries/react-query/sanity/getAllProjectsQuery/getAllProjectsQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

export async function fetchHasPrefinanceProjects({
  queryClient,
  apolloClient,
  languageCode,
}: {
  queryClient: QueryClient;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  languageCode: string;
}): Promise<boolean> {
  try {
    const allSanityProjects = await getFromCacheOrFetch({
      query: getAllSanityProjectsQuery({ sanityClient, languageCode }),
      reactQueryClient: queryClient,
    });

    const allOffChainProjects = await getFromCacheOrFetch({
      query: getAllOffchainProjectsQuery({
        client: apolloClient,
        languageCode,
      }),
      reactQueryClient: queryClient,
    });

    const prefinanceProjects =
      allOffChainProjects?.data?.allProjects?.nodes?.filter(project => {
        const sanityProject = allSanityProjects?.allProject?.find(
          sanityProject =>
            sanityProject.projectId === project?.id ||
            sanityProject.projectId === project?.slug,
        );
        return sanityProject?.projectPrefinancing?.isPrefinanceProject;
      });

    return (prefinanceProjects?.length ?? 0) > 0;
  } catch (error) {
    return false; // Return false if there's an error fetching projects
  }
}
