import { useQueries } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';

import { useProjectsMetadata } from './useProjectsMetadata';

export const useProjectsWithMetadata = (
  projectIds?: (string | undefined)[],
) => {
  const { queryClient } = useLedger();

  // Projects
  const projectsResults = useQueries({
    queries:
      projectIds?.map(projectId =>
        getProjectQuery({
          request: {
            projectId: projectId as string,
          },
          client: queryClient,
          enabled: !!queryClient && !!projectId,
        }),
      ) ?? [],
  });
  const projects = projectsResults.map(
    projectResult => projectResult.data?.project,
  );
  const isProjectsLoading = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

  const {
    projectsMetadata,
    isProjectsMetadataLoading,
    classes,
    classesMetadata,
    isClassesMetadataLoading,
  } = useProjectsMetadata(projects);

  return {
    projects,
    isProjectsLoading,
    projectsMetadata: projectsMetadata as (
      | AnchoredProjectMetadataLD
      | undefined
    )[],
    isProjectsMetadataLoading,
    classes,
    classesMetadata,
    isClassesMetadataLoading,
  };
};
