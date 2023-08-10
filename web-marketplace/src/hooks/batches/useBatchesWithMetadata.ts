import { useQueries } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';

import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

export const useBatchesWithMetadata = (
  credits: {
    batchDenom: string;
  }[],
) => {
  const { ecocreditClient } = useLedger();

  // Batches
  const batchesResult = useQueries({
    queries: credits.map(credit =>
      getBatchQuery({
        client: ecocreditClient,
        request: { batchDenom: credit.batchDenom },
      }),
    ),
  });
  const batches = batchesResult?.map(batchResult => batchResult.data) ?? [];
  const isBatchesLoading = batchesResult.some(
    batchResult => batchResult.isLoading,
  );

  const {
    projects,
    isProjectsLoading,
    projectsMetadata,
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  } = useProjectsWithMetadata(batches.map(batch => batch?.batch?.projectId));

  return {
    batches,
    isBatchesLoading,
    projects,
    isProjectsLoading,
    projectsMetadata,
    isProjectsMetadataLoading,
    classesMetadata,
    isClassesMetadataLoading,
  };
};
