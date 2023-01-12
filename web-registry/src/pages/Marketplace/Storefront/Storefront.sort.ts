import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

export type SellOrdersSortType =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'id-asc'
  | 'id-desc';

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
    default:
      return sellOrders;
  }
};

// Low to high price
function comparePriceAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  if (a.askUsdAmount > b.askUsdAmount) return 1; // sort a after b
  if (a.askUsdAmount < b.askUsdAmount) return -1; // sort a before b
  return 0;
}

// High to low price
function comparePriceDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  if (a.askUsdAmount < b.askUsdAmount) return 1; // sort a after b
  if (a.askUsdAmount > b.askUsdAmount) return -1; // sort a before b
  return 0;
}

// Low to high id
function compareIdAscending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  if (Number(a.id) > Number(b.id)) return 1; // sort a after b
  if (Number(a.id) < Number(b.id)) return -1; // sort a before b
  return 0;
}

// High to low id
function compareIdDescending(
  a: SellOrderInfoExtented,
  b: SellOrderInfoExtented,
): number {
  if (Number(a.id) < Number(b.id)) return 1; // sort a after b
  if (Number(a.id) > Number(b.id)) return -1; // sort a before b
  return 0;
}
