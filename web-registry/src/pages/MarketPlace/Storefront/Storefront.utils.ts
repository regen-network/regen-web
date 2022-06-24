import { NormalizedSellOrder } from './Storefront.types';

export const sortByExpirationDate = (
  sellOrderA: NormalizedSellOrder,
  sellOrderB: NormalizedSellOrder,
): number => {
  if (sellOrderA.expiration && sellOrderB.expiration) {
    return sellOrderA.expiration > sellOrderB.expiration ? -1 : 1;
  }

  return 0;
};
