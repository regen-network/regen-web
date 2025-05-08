import {
  QuerySellOrdersResponse,
  SellOrderInfo,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/query';
import { getAskUsdAmount } from 'legacy-pages/Marketplace/Storefront/Storefront.utils';
import uniq from 'lodash/uniq';
import { IBC_DENOM_PREFIX } from 'utils/ibc/getDenomTrace';

import { FetchSimplePriceResponse } from 'lib/coingecko';
import { DenomTraceWithHash } from 'lib/ibc/transfer/api';
import { getSimplePriceQuery } from 'lib/queries/react-query/coingecko/simplePrice/simplePriceQuery';

import { getDenomTraceByHashesQuery } from '../../../ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { getFromCacheOrFetch } from '../../../utils/getFromCacheOrFetch';
import { SELL_ORDERS_EXTENTED_KEY } from './getSellOrdersExtendedQuery.constants';
import {
  ReactQuerySellOrdersExtentedProps,
  ReactQuerySellOrdersExtentedResponse,
} from './getSellOrdersExtendedQuery.types';

export const getSellOrdersExtendedQuery = ({
  client,
  reactQueryClient,
  request,
  ...params
}: ReactQuerySellOrdersExtentedProps): ReactQuerySellOrdersExtentedResponse => ({
  queryKey: [SELL_ORDERS_EXTENTED_KEY],
  queryFn: async () => {
    if (!client) return undefined;
    let _request = { ...request };
    // Fetching all sell orders
    // TODO this could potentially be improved with pagination for the storefront page
    let sellOrders: SellOrderInfo[] = [];
    let response: QuerySellOrdersResponse | undefined;
    while (!response || response.pagination?.nextKey?.length) {
      if (response?.pagination?.nextKey?.length) {
        _request.pagination = {
          key: response.pagination.nextKey,
          countTotal: false,
          offset: 0n,
          limit: 100n,
          reverse: false,
        };
      }
      response = await client.regen.ecocredit.marketplace.v1.sellOrders(
        _request,
      );
      sellOrders.push(...response.sellOrders);
    }

    // Find sell orders that have ibc askDenom and gather their hash
    const ibcDenomHashes = uniq(
      sellOrders
        .filter(sellOrder => sellOrder.askDenom.includes(IBC_DENOM_PREFIX))
        .map(sellOrder => sellOrder.askDenom.replace(IBC_DENOM_PREFIX, '')),
    );

    // Call DenomsTrace on each ibc denom hash
    const denomTracesQuery = getDenomTraceByHashesQuery({
      hashes: ibcDenomHashes,
      queryClient: client,
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
