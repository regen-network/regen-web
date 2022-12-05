import uniq from 'lodash/uniq';

import { DenomTraceWithHash } from 'lib/ibc/transfer/api';

import { IBC_DENOM_PREFIX } from 'hooks/useQuerySellOrders';

import { getDenomTraceByHashesQuery } from '../../../ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { getFromCacheOrFetch } from '../../../utils/getFromCacheOrFetch';
import {
  ReactQuerySellOrdersExtentedProps,
  ReactQuerySellOrdersExtentedResponse,
} from './getSellOrdersExtendedQuery.types';

export const SELL_ORDERS_EXTENTED_KEY = 'sellOrdersExtented';

export const getSellOrdersExtendedQuery = ({
  client,
  reactQueryClient,
  ...params
}: ReactQuerySellOrdersExtentedProps): ReactQuerySellOrdersExtentedResponse => ({
  queryKey: [SELL_ORDERS_EXTENTED_KEY],
  queryFn: async () => {
    if (!client) return undefined;

    // Fetching all sell orders
    const sellOrdersResponse = await client.SellOrders({});
    const { sellOrders } = sellOrdersResponse;

    // Find sell orders that have ibc askDenom and gather their hash
    const ibcDenomHashes = uniq(
      sellOrders
        .filter(sellOrder => sellOrder.askDenom.includes(IBC_DENOM_PREFIX))
        .map(sellOrder => sellOrder.askDenom.replace(IBC_DENOM_PREFIX, '')),
    );

    // Call DenomsTrace on each ibc denom hash
    const denomTracesQuery = getDenomTraceByHashesQuery({
      hashes: ibcDenomHashes,
    });
    const denomTraces = await getFromCacheOrFetch<DenomTraceWithHash[] | void>({
      query: denomTracesQuery,
      reactQueryClient,
    });

    // Update sell orders by replacing ibc denoms with base denom from DenomTrace if needed
    const sellOrdersWithBaseDenom = sellOrders.map(sellOrder => {
      const denomTrace = denomTraces?.find(denomTrace =>
        sellOrder.askDenom.includes(denomTrace.hash),
      );

      return {
        ...sellOrder,
        askBaseDenom: denomTrace ? denomTrace.baseDenom : sellOrder.askDenom,
      };
    });

    return sellOrdersWithBaseDenom;
  },
  keepPreviousData: true,
  ...params,
});
