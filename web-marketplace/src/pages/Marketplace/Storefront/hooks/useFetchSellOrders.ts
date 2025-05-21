import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryClient, useLedger } from 'ledger';
import { getSellOrdersBySellerQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersBySellerQuery/getSellOrdersBySellerQuery';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

type UseFetchSellOrdersResponse = {
  sellOrders: SellOrderInfoExtented[] | undefined;
  refetchSellOrders: () => Promise<SellOrderInfoExtented[] | undefined>;
  isLoadingSellOrders: boolean;
};

export const useFetchSellOrders = (
  sellerAddress?: string,
  pagination?: { offset: number; limit: number },
): UseFetchSellOrdersResponse => {
  const { queryClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const sellOrdersQuery = useMemo(() => {
    if (sellerAddress) {
      return getSellOrdersBySellerQuery({
        client: queryClient as QueryClient,
        reactQueryClient,
        sellerAddress: sellerAddress,
        offset: BigInt(pagination?.offset ?? 0),
        limit: BigInt(pagination?.limit ?? 100),
      });
    }
    return getSellOrdersExtendedQuery({
      enabled: !!queryClient,
      client: queryClient as QueryClient,
      reactQueryClient,
      request: {
        pagination: {
          key: new Uint8Array(),
          offset: BigInt(pagination?.offset ?? 0),
          limit: BigInt(pagination?.limit ?? 100),
          countTotal: false,
          reverse: false,
        },
      },
    });
  }, [
    sellerAddress,
    pagination?.offset,
    pagination?.limit,
    queryClient,
    reactQueryClient,
  ]);

  const { data: sellOrders, isLoading: isLoadingSellOrders } =
    useQuery(sellOrdersQuery);

  // Refetch callback
  const refetchSellOrders = useCallback(async (): Promise<
    SellOrderInfoExtented[] | undefined
  > => {
    // Here invalidating the cache will automatically run again all query using this key.
    // Below we're returning the new result from the cache because this callback needs to return the new value
    // but in most cases it's enough for reload callbacks to just invalidate a key for refreshing the data and the UI.
    await reactQueryClient.invalidateQueries({
      queryKey: sellOrdersQuery.queryKey,
    });
    return reactQueryClient.getQueryData(
      sellOrdersQuery.queryKey ?? [SELL_ORDERS_EXTENTED_KEY],
    );
  }, [reactQueryClient, sellOrdersQuery]);

  return {
    sellOrders,
    refetchSellOrders,
    isLoadingSellOrders,
  };
};
// Query
//   const sellOrdersQuery = useMemo(
// () =>
// getSellOrdersExtendedQuery({
//   enabled: !!queryClient,
//   client: queryClient as QueryClient,
//   reactQueryClient,
//   request: {},
// }),
//     [queryClient, reactQueryClient],
//   );

//   // Fetch
//   const { data: sellOrders, isLoading: isLoadingSellOrders } =
//     useQuery(sellOrdersQuery);

// // Refetch callback
// const refetchSellOrders = useCallback(async (): Promise<
//   SellOrderInfoExtented[] | undefined
// > => {
//   // Here invalidating the cache will automatically run again all query using this key.
//   // Below we're returning the new result from the cache because this callback needs to return the new value
//   // but in most cases it's enough for reload callbacks to just invalidate a key for refreshing the data and the UI.
//   await reactQueryClient.invalidateQueries({
//     queryKey: sellOrdersQuery.queryKey,
//   });
//   return reactQueryClient.getQueryData(
//     sellOrdersQuery.queryKey ?? [SELL_ORDERS_EXTENTED_KEY],
//   );
// }, [reactQueryClient, sellOrdersQuery]);

//   return { sellOrders, refetchSellOrders, isLoadingSellOrders };
// };
