import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getClassesByIssuerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getClassesByIssuer/getClassesByIssuer';
import { useWallet } from 'lib/wallet/wallet';

function useQueryIsIssuer(): boolean {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const address = wallet?.address;

  const { data: classesByIssuerData } = useQuery(
    getClassesByIssuerQuery({
      enabled: !!address && !!graphqlClient,
      client: graphqlClient,
      issuer: address,
    }),
  );

  const isIssuer =
    (classesByIssuerData?.data.allClassIssuers?.nodes?.length ?? 0) > 0;

  return isIssuer;
}

export { useQueryIsIssuer };
