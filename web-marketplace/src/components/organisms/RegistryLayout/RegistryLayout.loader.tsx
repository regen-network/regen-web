import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { QueryClient } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/apolloSanity';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';
import { getAllSanityProjectsQuery } from 'lib/queries/react-query/sanity/getAllProjectsQuery/getAllProjectsQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

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
    // Queries
    const allSanityProjectsQuery = getAllSanityProjectsQuery({
      sanityClient,
      languageCode,
    });

    const allProjectsQuery = getAllProjectsQuery({
      client: apolloClient,
      enabled: true,
      languageCode,
    });

    // Fetch or Cache
    const allSanityProjects = await getFromCacheOrFetch({
      query: allSanityProjectsQuery,
      reactQueryClient: queryClient,
    });
    const allOffChainProjects = await getFromCacheOrFetch({
      query: allProjectsQuery,
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
    const hasPrefinanceProjects = (prefinanceProjects?.length ?? 0) > 0;

    return hasPrefinanceProjects;
  };
