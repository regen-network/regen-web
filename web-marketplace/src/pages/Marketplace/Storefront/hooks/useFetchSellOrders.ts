import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getSellOrdersExtendedQuery } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

type UseFetchSellOrdersResponse = {
  sellOrders: SellOrderInfoExtented[] | undefined;
  refetchSellOrders: () => Promise<SellOrderInfoExtented[] | undefined>;
  isLoadingSellOrders: boolean;
};

export const useFetchSellOrders = (): UseFetchSellOrdersResponse => {
  const { marketplaceClient } = useLedger();
  const reactQueryClient = useQueryClient();

  // Query
  const sellOrdersQuery = useMemo(
    () =>
      getSellOrdersExtendedQuery({
        enabled: !!marketplaceClient,
        client: marketplaceClient,
        reactQueryClient,
        request: {},
      }),
    [marketplaceClient, reactQueryClient],
  );

  // Fetch
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

  return { sellOrders, refetchSellOrders, isLoadingSellOrders };
};
