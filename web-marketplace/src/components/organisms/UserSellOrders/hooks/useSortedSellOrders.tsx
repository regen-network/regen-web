import { useState } from 'react';

import { SortCallbacksType } from 'web-components/src/components/table/ActionsTable';
import { Order } from 'web-components/src/components/table/Table.utils';

import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import { SELL_ORDERS_MAPPING } from 'components/organisms/SellOrdersTable/SellOrdersTable.constants';

import { SellOrdersSortType, sortSellOrders } from '../UserSellOrders.utils';

type Params = {
  sellOrders?: SellOrderInfoExtented[];
};

export type SortedSellOrdersResponse = {
  sortedSellOrders: SellOrderInfoExtented[];
  sortCallbacks: SortCallbacksType;
};

export const useSortedSellOrders = ({
  sellOrders = [],
}: Params): SortedSellOrdersResponse => {
  const [sort, setSort] = useState<SellOrdersSortType>('id-desc');

  const sortCallbacks = Object.values(SELL_ORDERS_MAPPING).map(header =>
    header.sortEnabled
      ? (order: Order) =>
          setSort(`${header.sortKey}-${order}` as SellOrdersSortType)
      : undefined,
  );
  const sortedSellOrders = sortSellOrders(sellOrders, sort);
  return {
    sortedSellOrders,
    sortCallbacks,
  };
};
