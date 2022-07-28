import { BuyCreditsValues } from './BuyCreditsModal';

export const getSellOrderLabel = (
  sellOrder: BuyCreditsValues | undefined,
): string => {
  const { sellOrderId, price, askDenom = '', creditCount } = sellOrder || {};
  return `${sellOrderId} (${price} ${askDenom
    .substring(1)
    .toUpperCase()}/credit: ${creditCount} credit(s) available)`;
};
