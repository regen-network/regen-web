import { SellOrderInfoNormalized } from 'pages/Projects/hooks/useProjectsSellOrders';

import { BuyCreditsValues } from './BuyCreditsModal';

export const getSellOrderLabel = (sellOrder: BuyCreditsValues): string => {
  const { sellOrderId, price, askDenom = '', creditCount } = sellOrder;
  return formatLabel(sellOrderId, price, askDenom, creditCount);
};

export const getSellOrderInfoLabel = (
  sellOrder: SellOrderInfoNormalized,
): string => {
  const { id, askAmount, askDenom = '', quantity } = sellOrder;
  return formatLabel(id, askAmount, askDenom, quantity);
};

const formatLabel = (
  sellOrderId: string,
  price: string | number,
  askDenom: string,
  creditCount: string | number,
): string => {
  return `${sellOrderId} (${price} ${askDenom
    .substring(1)
    .toUpperCase()}/credit: ${creditCount} credit(s) available)`;
};
