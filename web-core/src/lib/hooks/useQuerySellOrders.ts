import { useCallback, useEffect, useState } from 'react';
import {
  QueryClientImpl,
  SellOrderInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import uniq from 'lodash/uniq';

import { useLedger } from 'lib/clients/ledger';
import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

export const IBC_DENOM_PREFIX = 'ibc/';

export type SellOrderInfoExtented = SellOrderInfo & {
  askBaseDenom: string;
  askUsdAmount: number;
};

type QuerySellOrdersResponseExtented = {
  sellOrders: SellOrderInfoExtented[];
};

export type RefetchSellOrdersResponse = Promise<
  SellOrderInfoExtented[] | undefined
>;

export const useQuerySellOrders = function (): {
  sellOrdersResponse: QuerySellOrdersResponseExtented | undefined;
  refetchSellOrders: () => RefetchSellOrdersResponse;
} {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();

  const [sellOrdersResponse, setSellOrdersResponse] = useState<
    QuerySellOrdersResponseExtented | undefined
  >(undefined);

  useEffect(() => {
    if (!api?.queryClient || queryClient !== undefined) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient, queryClient]);

  const refetchSellOrders = useCallback(async (): RefetchSellOrdersResponse => {
    if (queryClient) {
      // Fetching all sell orders
      const sellOrdersResponse = await queryClient.SellOrders({});
      const { sellOrders } = sellOrdersResponse;

      // Find sell orders that have ibc askDenom and gather their hash
      const ibcDenomHashes = uniq(
        sellOrders
          .filter(sellOrder => sellOrder.askDenom.includes(IBC_DENOM_PREFIX))
          .map(sellOrder => sellOrder.askDenom.replace(IBC_DENOM_PREFIX, '')),
      );

      // Call DenomTrace on each ibc denom hash
      const denomTraces = await queryDenomTraceByHashes({
        hashes: ibcDenomHashes,
      });

      // Update sell orders by replacing ibc denoms with base denom from DenomTrace if needed
      const sellOrdersWithBaseDenom = sellOrders.map(sellOrder => {
        const denomTrace = denomTraces.find(denomTrace =>
          sellOrder.askDenom.includes(denomTrace.hash),
        );

        return {
          ...sellOrder,
          askBaseDenom: denomTrace ? denomTrace.baseDenom : sellOrder.askDenom,
          askUsdAmount: 0,
        };
      });

      // Set updated response
      setSellOrdersResponse({
        sellOrders: sellOrdersWithBaseDenom,
      });

      return sellOrdersWithBaseDenom;
    }

    return undefined;
  }, [queryClient]);

  useEffect(() => {
    refetchSellOrders();
  }, [queryClient, refetchSellOrders]);

  return { sellOrdersResponse, refetchSellOrders };
};
