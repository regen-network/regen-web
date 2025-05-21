import {
  QuerySellOrdersBySellerRequest,
  QuerySellOrdersBySellerResponse,
  QuerySellOrdersResponse,
  SellOrderInfo,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/query';
import { QueryClient as ReactQueryClient } from '@tanstack/react-query'; // adjust import to your actual type
import uniq from 'lodash/uniq';
import { IBC_DENOM_PREFIX } from 'utils/ibc/getDenomTrace';

import { QueryClient } from 'ledger';

import { getAskUsdAmount } from 'pages/Marketplace/Storefront/Storefront.utils';

import { getSimplePriceQuery } from '../../../coingecko/simplePrice/simplePriceQuery';
import { getDenomTraceByHashesQuery } from '../../../ibc/transfer/getDenomTraceByHashesQuery/getDenomTraceByHashesQuery';
import { getFromCacheOrFetch } from '../../../utils/getFromCacheOrFetch';
import { SellOrderInfoExtented } from '../getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';
import { getSellOrdersBySellerKey } from './getSellOrdersBySellerQuery.utils';

export function getSellOrdersBySellerQuery(queryConfig: {
  client: QueryClient;
  reactQueryClient: ReactQueryClient;
  sellerAddress: string;
  offset: bigint;
  limit: bigint;
  // Currently Regen Ledger queries do not support sorting - for
  // cases where we need sorting functionality we fetch all sell orders.
  serverPagination?: boolean;
}) {
  const {
    client,
    reactQueryClient,
    sellerAddress,
    offset,
    limit,
    serverPagination = false,
  } = queryConfig;

  const queryKey = getSellOrdersBySellerKey(
    sellerAddress,
    serverPagination ? offset.toString() : undefined,
    serverPagination ? limit.toString() : undefined,
  );

  return {
    queryKey,
    queryFn: async (): Promise<SellOrderInfoExtented[]> => {
      let sellOrders: SellOrderInfo[] = [];
      let response: QuerySellOrdersResponse | undefined;

      if (serverPagination) {
        // fetch paged sellOrdersBySeller
        const request: QuerySellOrdersBySellerRequest = {
          seller: sellerAddress,
          pagination: {
            key: new Uint8Array(), // mandatory field but not used as we do pagination using offset in this case
            offset,
            limit,
            countTotal: true,
            reverse: false,
          },
        };
        response =
          await client.regen.ecocredit.marketplace.v1.sellOrdersBySeller(
            request,
          );
        sellOrders = response.sellOrders ?? [];
      } else {
        // fetch all sellOrdersBySeller
        let request: QuerySellOrdersBySellerRequest = {
          seller: sellerAddress,
          pagination: {
            key: new Uint8Array(),
            offset: 0n,
            limit: 100n,
            countTotal: false,
            reverse: false,
          },
        };
        while (!response || response.pagination?.nextKey?.length) {
          if (response?.pagination?.nextKey?.length) {
            request.pagination = {
              key: response.pagination.nextKey,
              countTotal: false,
              offset: 0n,
              limit: 100n,
              reverse: false,
            };
          }
          response =
            await client.regen.ecocredit.marketplace.v1.sellOrdersBySeller(
              request,
            );
          sellOrders.push(...response.sellOrders);
        }
      }

      const ibcDenomHashes = uniq(
        sellOrders
          .filter(order => order.askDenom.includes(IBC_DENOM_PREFIX))
          .map(order => order.askDenom.replace(IBC_DENOM_PREFIX, '')),
      );

      const denomTraces = await getFromCacheOrFetch({
        query: getDenomTraceByHashesQuery({
          hashes: ibcDenomHashes,
          queryClient: client,
        }),
        reactQueryClient,
      });

      const prices = await getFromCacheOrFetch({
        query: getSimplePriceQuery({}),
        reactQueryClient,
      });

      // Sell orders with base denom and askAmount
      return sellOrders.map(order => {
        const trace = denomTraces?.find(x => order.askDenom.includes(x.hash));
        const askBaseDenom = trace ? trace.baseDenom : order.askDenom;
        const askUsdAmount = getAskUsdAmount({
          askAmount: order.askAmount,
          askBaseDenom,
          quantity: order.quantity,
          geckoPrices: prices,
        });
        return {
          ...order,
          askBaseDenom,
          askUsdAmount,
          totalSellOrders: Number(response.pagination?.total ?? 0),
        };
      });
    },
    keepPreviousData: true,
    enabled: !!client,
    initialData: undefined,
  };
}
