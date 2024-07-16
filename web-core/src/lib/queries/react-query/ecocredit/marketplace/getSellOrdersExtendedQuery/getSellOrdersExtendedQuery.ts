import uniq from 'lodash/uniq';

import { FetchSimplePriceResponse } from 'lib/coingecko';
import { DenomTraceWithHash } from 'lib/ibc/transfer/api';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';
import { getDenomTraceByHashesQuery } from 'lib/queries/react-query/ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { getAskUsdAmount } from 'lib/utils/Storefront/Storefront.utils';

import { IBC_DENOM_PREFIX } from 'lib/hooks/useQuerySellOrders';

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

    // get prices to compute AskUsdAmount
    const simplePriceData =
      await getFromCacheOrFetch<FetchSimplePriceResponse | null>({
        query: getSimplePriceQuery({}),
        reactQueryClient,
      });

    // Update sell orders by replacing ibc denoms with base denom from DenomTrace if needed
    const sellOrdersWithBaseDenom = sellOrders.map(sellOrder => {
      const denomTrace = denomTraces?.find(denomTrace =>
        sellOrder.askDenom.includes(denomTrace.hash),
      );
      const askBaseDenom = denomTrace
        ? denomTrace.baseDenom
        : sellOrder.askDenom;

      // Compute AskUsdAmount
      const { askAmount, quantity } = sellOrder;
      const askUsdAmount = getAskUsdAmount({
        askAmount,
        askBaseDenom,
        quantity,
        geckoPrices: simplePriceData,
      });

      return {
        ...sellOrder,
        askBaseDenom,
        askUsdAmount,
      };
    });

    return sellOrdersWithBaseDenom;
  },
  keepPreviousData: true,
  ...params,
});
