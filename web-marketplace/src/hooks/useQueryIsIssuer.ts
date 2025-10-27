import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string | null;
};

function useQueryIsIssuer({ address }: Props) {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;

  const { data: classesByIssuerData, isFetching } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!activeAddress && !!graphqlClient,
      client: graphqlClient,
      issuer: activeAddress,
    }),
  );

  const isIssuer =
    (classesByIssuerData?.data.allClassIssuers?.nodes?.length ?? 0) > 0;

  return { isIssuer, isLoadingIsIssuer: isFetching };
}

export { useQueryIsIssuer };
