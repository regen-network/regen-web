import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { normalizeProjectWithMetadata } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

type Props = {
  sanityCreditClassesData?: AllCreditClassQuery;
  enabled?: boolean;
};

export const useFetchAllOffChainProjects = ({
  sanityCreditClassesData,
  enabled = true,
}: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: allProjectsData, isFetching } = useQuery(
    getAllProjectsQuery({ client: graphqlClient, enabled }),
  );

  const offChainProjects = allProjectsData?.allProjects?.nodes.filter(
    project => !project?.onChainId,
  );

  const onlyOffChainProjectsWithData =
    offChainProjects?.map(project => ({
      offChain: true,
      ...normalizeProjectWithMetadata({
        offChainProject: project,
        projectMetadata: project?.metadata,
        projectPageMetadata: project?.metadata,
        programParty: project?.creditClassByCreditClassId?.partyByRegistryId,
        sanityClass: findSanityCreditClass({
          sanityCreditClassData: sanityCreditClassesData,
          creditClassIdOrUrl:
            project?.creditClassByCreditClassId?.onChainId ??
            project?.metadata?.['regen:creditClassId'] ??
            '',
        }),
      }),
    })) ?? [];

  return {
    allOffChainProjects: onlyOffChainProjectsWithData,
    isAllOffChainProjectsLoading: isFetching,
  };
};
