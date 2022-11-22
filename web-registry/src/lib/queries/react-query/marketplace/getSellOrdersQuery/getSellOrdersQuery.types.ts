import { QueryClient } from '@tanstack/react-query';

import { QuerySellOrdersProps } from 'lib/ecocredit/marketplace/marketplace';
import { MarketplaceQueryClient } from 'lib/ecocredit/marketplace/marketplace.types';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

export type ReactQuerySellOrdersProps = Omit<QuerySellOrdersProps, 'client'> & {
  client?: MarketplaceQueryClient;
  reactQueryClient?: QueryClient;
  enabled?: boolean;
};

export type ReactQuerySellOrdersResponse = {
  queryKey: string[];
  queryFn: () => Promise<SellOrderInfoExtented[] | undefined>;
  enabled: boolean;
  keepPreviousData: boolean;
  staleTime: number;
};
