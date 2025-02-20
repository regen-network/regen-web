import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { QueryClient, QueryObserverOptions } from '@tanstack/react-query';

import { QuerySellOrdersProps } from 'lib/ecocredit/marketplace/marketplace';
import { MarketplaceQueryClient } from 'lib/ecocredit/marketplace/marketplace.types';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type SellOrderInfoExtented = SellOrderInfo & {
  askBaseDenom: string;
  askUsdAmount: number;
};

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
