import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';

import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

export const useProjectsMetadata = (projects?: (ProjectInfo | undefined)[]) => {
  const { dataClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  // Project Metadata
  const projectsMetadatasResults = useQueries({
    queries:
      projects?.map(project =>
        getMetadataQuery({
          iri: project?.metadata,
          dataClient,
          enabled: !!dataClient,
          languageCode: selectedLanguage,
        }),
      ) ?? [],
  });
  const projectsMetadata = projectsMetadatasResults.map(metadataResult => {
    return metadataResult.data;
  });
  const isProjectsMetadataLoading = projectsMetadatasResults.some(
    metadataResult => metadataResult.isLoading,
  );

  // Credit Classes and their metadata
  const { classes, classesMetadata, isClassesMetadataLoading } =
    useClassesWithMetadata(projects?.map(project => project?.classId));

  return {
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
