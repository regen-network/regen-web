import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectsWithCreditClass } from 'lib/normalizers/projects/normalizeProjectsWithCreditClass';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

interface Response {
  projects: ProjectCardProps[];
  isProjectsLoading: boolean;
}

interface Props {
  projectIds?: string[];
}

export const useFetchProjectsByIds = ({ projectIds }: Props): Response => {
  const graphqlClient = useApolloClient();

  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const { projects, isProjectsLoading, projectsMetadata, classesMetadata } =
    useProjectsWithMetadata(projectIds);

  const offChainProjectResults = useQueries({
    queries: projects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project?.project?.id ?? '',
        enabled: !!project?.project?.id,
      }),
    ),
  });
  const projectPagesMetadata = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  // Normalization
  const normalizedProjects = normalizeProjectsWithCreditClass({
    projects: projects
      .map(project => project?.project)
      .filter(project => project !== undefined) as ProjectInfo[],
    projectsMetadata,
    projectPagesMetadata,
    classesMetadata,
    sanityCreditClassData: creditClassData,
  });

  return {
    projects: normalizedProjects,
    isProjectsLoading,
  };
};
