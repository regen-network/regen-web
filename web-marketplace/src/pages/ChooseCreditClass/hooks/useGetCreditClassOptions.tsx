import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/sanity';
import { normalizeCreditClassOptions } from 'lib/normalizers/creditClass/normalizeCreditClassOption';
import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';

interface CreditClassOption {
  id: string;
  onChainId: string;
  imageSrc: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

function useGetCreditClassOptions(): {
  creditClassOptions: CreditClassOption[];
  loading: boolean;
} {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const address = wallet?.address;

  const { data: classesByIssuerData, isLoading } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!address && !!graphqlClient,
      client: graphqlClient,
      issuer: address,
    }),
  );

  const { data: sanityCreditClasses } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const classIds = classesByIssuerData?.data.allClassIssuers?.nodes.map(
    creditClass => creditClass?.classId,
  );

  const { classesMetadata } = useClassesWithMetadata(classIds);

  const creditClassOptions = normalizeCreditClassOptions({
    classesByIssuer: classesByIssuerData?.data,
    classesMetadata,
    sanityCreditClasses,
  });

  return { creditClassOptions, loading: isLoading };
}

export { useGetCreditClassOptions };
