import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';
import { getClassesQuery } from 'lib/queries/react-query/ecocredit/getClassesQuery/getClassesQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';

export type CreditClassWithMedata = {
  creditClass: ClassInfo;
  metadata?: AnchoredProjectMetadataLD | CreditClassMetadataLD;
};

type UseFetchCreditClassesResponse = {
  creditClassesWithMetadata?: CreditClassWithMedata[];
  isLoading: boolean;
};

export const useFetchCreditClasses = (): UseFetchCreditClassesResponse => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { ecocreditClient, dataClient } = useLedger();
  const { data: creditClassesData, isLoading } = useQuery(
    getClassesQuery({
      client: ecocreditClient,
      enabled: !!ecocreditClient,
    }),
  );
  const creditClasses = creditClassesData?.classes;

  const creditClassesMetadataResults = useQueries({
    queries:
      creditClasses?.map(creditClass =>
        getMetadataQuery({
          iri: creditClass.metadata,
          enabled: !!dataClient,
          dataClient,
          languageCode: selectedLanguage,
        }),
      ) ?? [],
  });

  const creditClassesWithMetadata = creditClasses?.map(
    (creditClass, index) => ({
      creditClass,
      metadata: creditClassesMetadataResults[index].data,
    }),
  );

  return {
    creditClassesWithMetadata,
    isLoading:
      isLoading || creditClassesMetadataResults.some(res => res.isLoading),
  };
};
