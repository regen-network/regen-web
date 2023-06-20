import { useQueries } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';

import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

export const useProjectsWithMetadata = (
  projectIds?: (string | undefined)[],
) => {
  const { ecocreditClient, dataClient } = useLedger();

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
  const projects = projectsResults.map(projectResult => projectResult.data);
  const isProjectsLoading = projectsResults.some(
    projectResult => projectResult.isLoading,
  );

  // Project Metadata
  const projectsMetadatasResults = useQueries({
    queries: projects.map(project =>
      getMetadataQuery({
        iri: project?.project?.metadata,
        dataClient,
        enabled: !!dataClient,
      }),
    ),
  });
  const projectsMetadata = projectsMetadatasResults.map(metadataResult => {
    return metadataResult.data;
  });
  const isProjectsMetadataLoading = projectsMetadatasResults.some(
    metadataResult => metadataResult.isLoading,
  );

  // Credit Classes and their metadata
  const { classesMetadata, isClassesMetadataLoading } = useClassesWithMetadata(
    projects.map(project => project?.project?.classId),
  );

  return {
    projects,
    isProjectsLoading,
    projectsMetadata: projectsMetadata as (
      | AnchoredProjectMetadataLD
      | undefined
    )[],
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  };
};
