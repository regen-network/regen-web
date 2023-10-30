import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
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
  const { ecocreditClient, dataClient, marketplaceClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const { data: creditClassesData, isFetching: isLoadingCreditClasses } =
    useQuery(
      getClassesQuery({
        client: ecocreditClient,
        enabled: !!ecocreditClient && !admin && fetchAll,
      }),
    );
  const allCreditClasses = creditClassesData?.classes;

  const {
    data: creditClassesByAdminData,
    isFetching: isLoadingCreditClassesByAdmin,
  } = useQuery(
    getClassesByAdminQuery({
      client: ecocreditClient,
      enabled: !!ecocreditClient && !!admin,
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
          enabled: !!dataClient,
          dataClient,
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
    }),
  );

  const { data: sellOrders, isLoading: isLoadingSellOrders } = useQuery(
    getSellOrdersExtendedQuery({
      enabled: !!marketplaceClient,
      client: marketplaceClient,
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
