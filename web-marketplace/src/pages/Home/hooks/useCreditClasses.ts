import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/sanity';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { getDisplayParty } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

type Props = {
  skippedClassId: string;
};

export const useCreditClasses = ({ skippedClassId }: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  // All credit class from sanity
  const { data: creditClassData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Filtered based on env variable
  const creditClassesFiltered = creditClassData?.allCreditClass?.filter(
    c => c.path !== skippedClassId,
  );

  // Credit Classes metadata
  const { classesMetadata } = useClassesWithMetadata(
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

  // Credit classes program
  const creditClassesPrograms = creditClassesFiltered?.map((_, index) =>
    getDisplayParty(
      classesMetadata?.[index]?.['regen:sourceRegistry'],
      dbDataByOnChainIdDataResults?.[index]?.data?.data?.creditClassByOnChainId
        ?.partyByRegistryId,
    ),
  );

  return {
    creditClasses: creditClassesFiltered,
    creditClassesPrograms,
  };
};
