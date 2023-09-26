import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string;
};

function useQueryIsIssuer({ address }: Props) {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;

  const { data: classesByIssuerData, isFetching } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!address && !!graphqlClient,
      client: graphqlClient,
      issuer: address ?? walletAddress,
    }),
  );

  const isIssuer =
    (classesByIssuerData?.data.allClassIssuers?.nodes?.length ?? 0) > 0;

  return { isIssuer, isLoadingIsIssuer: isFetching };
}

export { useQueryIsIssuer };
