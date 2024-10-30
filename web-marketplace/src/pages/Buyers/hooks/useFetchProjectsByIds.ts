import { useApolloClient } from '@apollo/client';
import { useLingui } from '@lingui/react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeProjectsWithCreditClass } from 'lib/normalizers/projects/normalizeProjectsWithCreditClass';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

interface Response {
  projects: ProjectCardProps[];
  isProjectsLoading: boolean;
}

interface Props {
  projectIds?: string[];
}

export const useFetchProjectsByIds = ({ projectIds }: Props): Response => {
  const { _ } = useLingui();
  const graphqlClient = useApolloClient();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: creditClassData } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { projects, isProjectsLoading, projectsMetadata, classesMetadata } =
    useProjectsWithMetadata(projectIds);

  const offChainProjectResults = useQueries({
    queries: projects.map(project =>
      getProjectByOnChainIdQuery({
        client: graphqlClient,
        onChainId: project?.id ?? '',
        enabled: !!project?.id,
      }),
    ),
  });
  const projectPagesMetadata = offChainProjectResults.map(
    queryResult => queryResult.data?.data.projectByOnChainId?.metadata,
  );

  const programParties = offChainProjectResults.map(
    queryResult =>
      queryResult.data?.data.projectByOnChainId?.creditClassByCreditClassId
        ?.accountByRegistryId,
  );

  // Normalization
  const normalizedProjects = normalizeProjectsWithCreditClass({
    projects: projects
      .map(project => project)
      .filter(project => project !== undefined) as ProjectInfo[],
    projectsMetadata,
    projectPagesMetadata,
    programParties,
    classesMetadata,
    sanityCreditClassData: creditClassData,
    _,
  });

  return {
    projects: normalizedProjects,
    isProjectsLoading,
  };
};
