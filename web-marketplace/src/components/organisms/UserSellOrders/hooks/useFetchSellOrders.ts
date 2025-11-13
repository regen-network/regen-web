import { useCallback, useMemo } from 'react';
import {
  QueryObserverOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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
  const sellOrdersQuery = useMemo<
    QueryObserverOptions<SellOrderInfoExtented[] | undefined>
  >(() => {
    if (sellerAddress) {
      return getSellOrdersBySellerQuery({
        client: queryClient as QueryClient,
        reactQueryClient,
        sellerAddress,
        offset: BigInt(pagination?.offset ?? 0),
        limit: BigInt(pagination?.limit ?? 100),
        enabled: !!queryClient,
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

  const refetchSellOrders = useCallback(async (): Promise<
    SellOrderInfoExtented[] | undefined
  > => {
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
