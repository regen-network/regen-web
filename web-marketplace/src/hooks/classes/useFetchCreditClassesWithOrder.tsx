import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { QueryClient, useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { normalizeCreditClassesWithOrders } from 'lib/normalizers/creditClass/normalizeCreditClassesWithOrders/normalizeCreditClassesWithOrders';
import { getClassesByAdminQuery } from 'lib/queries/react-query/ecocredit/getClassesByAdminQuery/getClassesByAdminQuery';
import { getClassesQuery } from 'lib/queries/react-query/ecocredit/getClassesQuery/getClassesQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

type Props = {
  admin?: string | null;
  userAddress?: string;
  fetchAll?: boolean;
};

export const useFetchCreditClassesWithOrder = ({
  admin,
  userAddress,
  fetchAll = false,
}: Props) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { data: creditClassesData, isFetching: isLoadingCreditClasses } =
    useQuery(
      getClassesQuery({
        client: queryClient,
        enabled: !!queryClient && !admin && fetchAll,
      }),
    );
  const allCreditClasses = creditClassesData?.classes;

  const {
    data: creditClassesByAdminData,
    isFetching: isLoadingCreditClassesByAdmin,
  } = useQuery(
    getClassesByAdminQuery({
      client: queryClient,
      enabled: !!queryClient && !!admin,
      request: { admin: admin as string },
    }),
  );
  const creditClassesByAdmin = creditClassesByAdminData?.classes;

  const creditClasses = creditClassesByAdmin ?? allCreditClasses;

  const creditClassesMetadataResults = useQueries({
    queries:
      creditClasses?.map(creditClass =>
        getMetadataQuery({
          iri: creditClass.metadata,
          enabled: !!queryClient,
          client: queryClient,
          languageCode: selectedLanguage,
        }),
      ) ?? [],
  });

  const creditClassesWithMetadata = creditClasses?.map(
    (creditClass, index) => ({
      creditClass,
      metadata: creditClassesMetadataResults[index]
        .data as CreditClassMetadataLD,
    }),
  );

  const {
    data: sanityCreditClassData,
    isFetching: isSanityCreditClassLoading,
  } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const { data: sellOrders, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!queryClient,
      client: queryClient as QueryClient,
      reactQueryClient,
      request: {},
    }),
  );

  const normalizedCreditClasses = normalizeCreditClassesWithOrders({
    classesWithMetadata: creditClassesWithMetadata,
    sanityCreditClasses: sanityCreditClassData,
    sellOrders,
    userAddress,
  });

  return {
    creditClasses: normalizedCreditClasses,
    isLoadingCreditClasses:
      isLoadingCreditClasses ||
      isLoadingCreditClassesByAdmin ||
      isSanityCreditClassLoading ||
      isLoadingSellOrders ||
      creditClassesMetadataResults.some(res => res.isLoading),
  };
};
