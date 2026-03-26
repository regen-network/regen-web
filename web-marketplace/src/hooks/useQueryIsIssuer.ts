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
  enabled?: boolean;
};

function useQueryIsIssuer({ address, enabled = true }: Props) {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;
  const queryEnabled = enabled && !!activeAddress && !!graphqlClient;

  const { data: classesByIssuerData, isFetching } = useQuery(
    getClassesByIssuerQuery({
      enabled: queryEnabled,
      client: graphqlClient,
      issuer: activeAddress,
    }),
  );

  const isIssuer =
    (classesByIssuerData?.data.allClassIssuers?.nodes?.length ?? 0) > 0;

  return {
    isIssuer,
    isLoadingIsIssuer: isFetching,
  };
}

export { useQueryIsIssuer };
