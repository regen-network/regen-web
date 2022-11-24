import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import {
  getSellOrdersExtentedQuery,
  SELL_ORDERS_EXTENTED_KEY,
} from 'lib/queries/react-query/marketplace/getSellOrdersExtentedQuery/getSellOrdersExtentedQuery';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

type UseFetchSellOrdersResponse = {
  sellOrders: SellOrderInfoExtented[] | undefined;
  refetchSellOrders: () => Promise<SellOrderInfoExtented[] | undefined>;
};

export const useFetchSellOrders = (): UseFetchSellOrdersResponse => {
  const { marketplaceClient } = useLedger();
  const reactQueryClient = useQueryClient();
  const sellOrdersQuery = useMemo(
    () =>
      getSellOrdersExtentedQuery({
        enabled: !!marketplaceClient,
        client: marketplaceClient,
        reactQueryClient,
        request: {},
      }),
    [marketplaceClient, reactQueryClient],
  );
  const { data: sellOrders } = useQuery(sellOrdersQuery);
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

  return { sellOrders, refetchSellOrders };
};
