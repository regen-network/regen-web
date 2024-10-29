import { useQueries } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';

export const useClassesWithMetadata = (classIds?: (string | undefined)[]) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { ecocreditClient, dataClient } = useLedger();

  // Credit Classes
  const classResults = useQueries({
    queries:
      classIds?.map(classId =>
        getClassQuery({
          client: ecocreditClient,
          request: {
            classId,
          },
          enabled: !!ecocreditClient && !!classId,
        }),
      ) ?? [],
  });
  const classes = classResults.map(classResult => {
    return classResult.data;
  });
  const classesInfo = classes.map(creditClass => {
    return creditClass?.class;
  });

  // Credit Classes Metadata
  const classesMetadataResults = useQueries({
    queries: classes.map(c =>
      getMetadataQuery({
        iri: c?.class?.metadata,
        dataClient,
        enabled: !!dataClient,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const classesMetadata = classesMetadataResults.map(metadataResult => {
    return metadataResult.data;
  });
  const isClassesMetadataLoading = classesMetadataResults.some(
    metadataResult => metadataResult.isLoading,
  );

  return {
    classes: classesInfo,
    classesMetadata: classesMetadata as (CreditClassMetadataLD | undefined)[],
    isClassesMetadataLoading,
  };
};
