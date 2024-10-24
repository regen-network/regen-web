import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import {
  AllCreditClassQuery,
  AllPrefinanceProjectQuery,
} from 'generated/sanity-graphql';
import { IS_TERRASOS } from 'lib/env';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type Props = {
  sanityCreditClassesData?: AllCreditClassQuery;
  enabled?: boolean;
  prefinanceProjectsData?: AllPrefinanceProjectQuery;
};

export const useFetchAllOffChainProjects = ({
  sanityCreditClassesData,
  enabled = true,
  prefinanceProjectsData,
}: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: allProjectsData, isFetching } = useQuery(
    getAllProjectsQuery({ client: graphqlClient, enabled }),
  );

  const onlyOffChainProjectsWithData =
    allProjectsData?.allProjects?.nodes?.map(project => {
      const prefinanceProject = prefinanceProjectsData?.allProject?.find(
        sanityProject =>
          sanityProject.projectId === project?.id ||
          sanityProject.projectId === project?.slug,
      );
      return {
        onChainId: project?.onChainId,
        offChain: !project?.onChainId,
        ...normalizeProjectWithMetadata({
          offChainProject: project,
          projectMetadata: project?.metadata,
          projectPageMetadata: project?.metadata,
          programAccount:
            project?.creditClassByCreditClassId?.accountByRegistryId,
          sanityClass: findSanityCreditClass({
            sanityCreditClassData: sanityCreditClassesData,
            creditClassIdOrUrl:
              project?.creditClassByCreditClassId?.onChainId ??
              project?.metadata?.['regen:creditClassId'] ??
              '',
          }),
          projectPrefinancing: prefinanceProject?.projectPrefinancing,
        }),
      };
    }) ?? [];

  const onlyOffChainProjectsWithDataFilteredByType =
    onlyOffChainProjectsWithData.filter(project => {
      return IS_TERRASOS ? project.type === 'TerrasosProjectInfo' : true;
    });

  return {
    allOffChainProjects: onlyOffChainProjectsWithDataFilteredByType,
    isAllOffChainProjectsLoading: isFetching,
  };
};
