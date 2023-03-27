import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';

import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectsWithCreditClass } from 'lib/normalizers/projects/normalizeProjectsWithCreditClass';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

interface Response {
  projects: ProjectCardProps[];
  isLoadingProjects: boolean;
}

interface Props {
  projectIds?: string[];
}

export const useFetchProjectsByIds = ({ projectIds }: Props): Response => {
  const { ecocreditClient } = useLedger();
  const graphqlClient = useApolloClient();

  // Projects
  const projectsResults = useQueries({
    queries:
      projectIds?.map(projectId =>
        getProjectQuery({
          request: {
            projectId,
          },
          client: ecocreditClient,
        }),
      ) ?? [],
  });
  const projects = projectsResults
    .map(projectResult => projectResult.data?.project)
    .filter(project => project !== undefined) as ProjectInfo[];
  const isLoadingProjects = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

  // Metadatas
  const metadatasResults = useQueries({
    queries: projects?.map(project =>
      getMetadataQuery({ iri: project?.metadata }),
    ),
  });

  const metadatas = metadatasResults.map(metadataResult => {
    return metadataResult.data;
  });

  const offChainProjectResults = useQueries({
    queries: projects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project.id,
      }),
    ),
  });
  const projectPageMetadatas = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  // AllCreditClasses
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Normalization
  const normalizedProjects = normalizeProjectsWithCreditClass({
    metadatas,
    projectPageMetadatas,
    projects,
    sanityCreditClassData: creditClassData,
  });

  return {
    projects: normalizedProjects,
    isLoadingProjects,
  };
};
