import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

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

export const sortSellOrders = (
  sellOrders: SellOrderInfoExtented[],
  sort: SellOrdersSortType,
): SellOrderInfoExtented[] => {
  switch (sort) {
    case 'price-asc':
      return sellOrders.sort(comparePriceAscending);
    case 'price-desc':
      return sellOrders.sort(comparePriceDescending);
    case 'id-asc':
      return sellOrders.sort(compareIdAscending);
    case 'id-desc':
      return sellOrders.sort(compareIdDescending);
    case 'amount-asc':
      return sellOrders.sort(compareAmountAscending);
    case 'amount-desc':
      return sellOrders.sort(compareAmountDescending);
    case 'currency-denom-asc':
      return sellOrders.sort(compareCurrencyDenomAscending);
    case 'currency-denom-desc':
      return sellOrders.sort(compareCurrencyDenomDescending);
    case 'batch-denom-asc':
      return sellOrders.sort(compareBatchDenomAscending);
    case 'batch-denom-desc':
      return sellOrders.sort(compareBatchDenomDescending);
    default:
      return sellOrders;
  }
};

// Generic sort

type SortArgType = string | number;

function defaultSortAsc(a: SortArgType, b: SortArgType): number {
  if (a > b) return 1; // sort a after b
  if (a < b) return -1; // sort a before b
  return 0;
}

function defaultSortDesc(a: SortArgType, b: SortArgType): number {
  if (a < b) return 1; // sort a before b
  if (a > b) return -1; // sort a afer b
  return 0;
}

/* Price */

// Low to high price
function comparePriceAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortAsc(a.askUsdAmount, b.askUsdAmount);
}

// High to low price
function comparePriceDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortDesc(a.askUsdAmount, b.askUsdAmount);
}

/* ID */

// Low to high id
function compareIdAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortAsc(Number(a.id), Number(b.id));
}

// High to low id
function compareIdDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortDesc(Number(a.id), Number(b.id));
}

/* Amount */

// Low to high amount
function compareAmountAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortAsc(Number(a.quantity), Number(b.quantity));
}

// High to low amount
function compareAmountDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortDesc(Number(a.quantity), Number(b.quantity));
}

/* Currency Denom */

// Low to high currency denom
function compareCurrencyDenomAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortAsc(a.askBaseDenom, b.askBaseDenom);
}

// High to low currency denom
function compareCurrencyDenomDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortDesc(a.askBaseDenom, b.askBaseDenom);
}

/* Batch denom */

// Low to high batch denom
function compareBatchDenomAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortAsc(a.batchDenom, b.batchDenom);
}

// High to low batch denom
function compareBatchDenomDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  return defaultSortDesc(a.batchDenom, b.batchDenom);
}
