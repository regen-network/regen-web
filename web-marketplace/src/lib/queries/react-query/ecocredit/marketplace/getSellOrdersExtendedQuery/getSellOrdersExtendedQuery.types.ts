import {
  QuerySellOrdersRequest,
  SellOrderInfo,
} from '@regen-network/api/regen/ecocredit/marketplace/v1/query';
import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient as RPCQueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type SellOrderInfoExtented = SellOrderInfo & {
  askBaseDenom: string;
  askUsdAmount: number;
} & {
  totalSellOrders?: number;
};

export type ReactQuerySellOrdersExtentedResponse = QueryObserverOptions<
  SellOrderInfoExtented[] | undefined
>;

export type ReactQuerySellOrdersExtentedProps = {
  request: QuerySellOrdersRequest;
  client: RPCQueryClient;
  reactQueryClient?: QueryClient;
} & ReactQueryBuilderResponse<ReactQuerySellOrdersExtentedResponse>;
