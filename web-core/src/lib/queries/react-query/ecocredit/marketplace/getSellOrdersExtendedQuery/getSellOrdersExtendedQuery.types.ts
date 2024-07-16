import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

import { QuerySellOrdersProps } from 'lib/ecocredit/marketplace/marketplace';
import { MarketplaceQueryClient } from 'lib/ecocredit/marketplace/marketplace.types';

import { SellOrderInfoExtented } from 'lib/hooks/useQuerySellOrders';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQuerySellOrdersExtentedResponse = QueryObserverOptions<
  SellOrderInfoExtented[] | undefined
>;

export type ReactQuerySellOrdersExtentedProps = Omit<
  QuerySellOrdersProps,
  'client'
> & {
  client?: MarketplaceQueryClient;
  reactQueryClient?: QueryClient;
} & ReactQueryBuilderResponse<ReactQuerySellOrdersExtentedResponse>;
