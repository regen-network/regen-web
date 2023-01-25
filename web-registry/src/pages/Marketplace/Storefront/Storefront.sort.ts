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
      return sellOrders.sort(asc('askUsdAmount'));
    case 'price-desc':
      return sellOrders.sort(desc('askUsdAmount'));
    case 'id-asc':
      return sellOrders.sort(asc('id', toNum));
    case 'id-desc':
      return sellOrders.sort(desc('id', toNum));
    case 'amount-asc':
      return sellOrders.sort(asc('quantity', toNum));
    case 'amount-desc':
      return sellOrders.sort(desc('quantity', toNum));
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
// transforms
const toNum = (a: unknown): number => Number(a);

// Generic sort
type SortArgType = string | number;
function isSortArgType(a: unknown): a is SortArgType {
  return typeof a === 'string' || typeof a === 'number';
}

function createSortHandler<T>(
  sortFn: (a: SortArgType, b: SortArgType) => number,
) {
  return (key: keyof T, transformFn?: (a: unknown) => SortArgType) => {
    return (a: T, b: T): number => {
      const aVal = transformFn ? transformFn(a[key]) : a[key];
      const bVal = transformFn ? transformFn(b[key]) : b[key];
      if (!isSortArgType(aVal) || !isSortArgType(bVal)) {
        throw new Error(`Invalid sort argument type`);
      }
      return sortFn(aVal, bVal);
    };
  };
}

const asc = createSortHandler<SellOrderInfoExtented>((a, b) => {
  if (a > b) return 1; // sort a after b
  if (a < b) return -1; // sort a before b
  return 0;
});

const desc = createSortHandler<SellOrderInfoExtented>((a, b) => {
  if (a < b) return 1; // sort a before b
  if (a > b) return -1; // sort a afer b
  return 0;
});
