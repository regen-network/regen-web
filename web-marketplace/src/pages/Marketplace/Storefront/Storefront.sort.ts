import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';
import {
  createAscSortHandler,
  createDescSortHandler,
} from 'lib/sort/createSortHandler';
import { transformToNum } from 'lib/sort/transforms';

export type SellOrdersSortType =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'price-asc'
  | 'price-desc'
  | 'id-asc'
  | 'id-desc'
  | 'amount-asc'
  | 'amount-desc'
  | 'currency-denom-asc'
  | 'currency-denom-desc'
  | 'batch-denom-asc'
  | 'batch-denom-desc';

const asc = createAscSortHandler<SellOrderInfoExtented>();
const desc = createDescSortHandler<SellOrderInfoExtented>();

export const sortSellOrders = (
  sellOrders: SellOrderInfoExtented[],
  sort: SellOrdersSortType,
): SellOrderInfoExtented[] => {
  switch (sort) {
    case 'price-asc':
      return sellOrders.sort(asc('askUsdAmount'));
    case 'price-desc':
      return sellOrders.sort(desc('askUsdAmount'));
    case 'id-asc':
      return sellOrders.sort(asc('id', transformToNum));
    case 'id-desc':
      return sellOrders.sort(desc('id', transformToNum));
    case 'amount-asc':
      return sellOrders.sort(asc('quantity', transformToNum));
    case 'amount-desc':
      return sellOrders.sort(desc('quantity', transformToNum));
    case 'currency-denom-asc':
      return sellOrders.sort(asc('askBaseDenom'));
    case 'currency-denom-desc':
      return sellOrders.sort(desc('askBaseDenom'));
    case 'batch-denom-asc':
      return sellOrders.sort(asc('batchDenom'));
    case 'batch-denom-desc':
      return sellOrders.sort(desc('batchDenom'));
    default:
      return sellOrders;
  }
};
