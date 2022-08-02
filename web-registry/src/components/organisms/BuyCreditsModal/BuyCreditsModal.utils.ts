import { BuyCreditsValues } from './BuyCreditsModal';

// eslint-disable-next-line
export const getSellOrderLabel = (sellOrder: BuyCreditsValues | undefined) => {
  const { sellOrderId, price, askDenom = '', creditCount } = sellOrder || {};
  return `${sellOrderId} (${price} ${askDenom
    .substring(1)
    .toUpperCase()}/credit: ${creditCount} credit(s) available)`;
};
