import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from 'lib/auth/auth';
import { getOrdersByBuyerAddressQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress';
import { useWallet } from 'lib/wallet/wallet';

export const useShowOrders = () => {
  const { activeAccount, loading } = useAuth();
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { activeWalletAddr } = useWallet();

  const fiatOrders = activeAccount?.fiatOrdersByAccountId?.nodes;

  const { data, isLoading: cryptoOrdersLoading } = useQuery(
    getOrdersByBuyerAddressQuery({
      client: apolloClient,
      enabled: !!activeWalletAddr && !!apolloClient,
      buyerAddress: activeWalletAddr as string,
    }),
  );
  const cryptoOrders = data?.data?.allOrders?.nodes;

  return (
    (!loading && fiatOrders && fiatOrders.length > 0) ||
    (!cryptoOrdersLoading && cryptoOrders && cryptoOrders.length > 0)
  );
};
