import { SELL_ORDERS_BY_SELLER_KEY } from './getSellOrdersBySellerQuery.constants';

export const getSellOrdersBySellerKey = (
  sellerAddress: string,
  offset?: string,
  limit?: string,
): string[] => [
  SELL_ORDERS_BY_SELLER_KEY,
  sellerAddress,
  ...(offset ? [offset] : []),
  ...(limit ? [limit] : []),
];
