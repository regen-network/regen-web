import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { normalizeCreditClassItems } from 'lib/normalizers/creditClass/normalizeCreditClassItems/normalizeCreditClassItems';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/registry-server/graphql/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

interface CreditClassItem {
  id: string;
  onChainId: string;
  imageSrc: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

function useGetCreditClassItems(): {
  creditClassItems: CreditClassItem[];
  loading: boolean;
} {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { activeAccount } = useAuth();
  const address = activeAccount?.addr;

  const { data: classesByIssuerData, isLoading } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!address && !!graphqlClient,
      client: graphqlClient,
      issuer: address,
    }),
  );

  const { data: offChainCreditClasses } = useQuery(
    getAllCreditClassesQuery({
      client: graphqlClient,
      enabled: !!graphqlClient,
    }),
  );

  const { data: sanityCreditClasses } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const classIds = classesByIssuerData?.data.allClassIssuers?.nodes.map(
    creditClass => creditClass?.classId,
  );

  const { classesMetadata } = useClassesWithMetadata(classIds);

  const creditClassItems = normalizeCreditClassItems({
    classesByIssuer: classesByIssuerData?.data,
    classesMetadata,
    sanityCreditClasses,
    offChainCreditClasses,
  });

  return { creditClassItems, loading: isLoading };
}

export { useGetCreditClassItems };
