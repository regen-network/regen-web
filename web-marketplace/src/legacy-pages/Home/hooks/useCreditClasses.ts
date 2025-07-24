import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

type Props = {
  skippedClassId?: string;
};

export const useCreditClasses = ({ skippedClassId }: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  // All credit class from sanity
  const { data: creditClassData, isFetching: isSanityCreditClassLoading } =
    useQuery(
      getAllSanityCreditClassesQuery({
        sanityClient,
        languageCode: selectedLanguage,
      }),
    );

  // Filtered based on env variable (only filter if skippedClassId is provided)
  const creditClassesFiltered = creditClassData?.allCreditClass?.filter(
    c => !skippedClassId || c.path !== skippedClassId,
  );

  // Credit Classes metadata
  const { classesMetadata, isClassesMetadataLoading } = useClassesWithMetadata(
    creditClassesFiltered?.map(creditClass =>
      creditClass.path === null ? undefined : creditClass.path,
    ),
  );
  // Credit Classes data
  const dbDataByOnChainIdDataResults = useQueries({
    queries:
      creditClassesFiltered?.map(creditClass =>
        getCreditClassByOnChainIdQuery({
          client: graphqlClient,
          onChainId: creditClass.path as string,
          enabled: !!graphqlClient,
        }),
      ) ?? [],
  });
  const isDbDataByOnChainIdLoading = dbDataByOnChainIdDataResults.some(
    res => res.isFetching,
  );

  // Credit classes program
  const creditClassesPrograms = creditClassesFiltered?.map((_, index) =>
    getDisplayAccount(
      classesMetadata?.[index]?.['regen:sourceRegistry'],
      dbDataByOnChainIdDataResults?.[index]?.data?.data?.creditClassByOnChainId
        ?.accountByRegistryId,
    ),
  );
  return {
    creditClasses: creditClassesFiltered,
    creditClassesPrograms,
    loading:
      isDbDataByOnChainIdLoading ||
      isClassesMetadataLoading ||
      isSanityCreditClassLoading,
  };
};
