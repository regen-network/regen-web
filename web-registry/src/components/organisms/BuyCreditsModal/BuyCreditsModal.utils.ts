import { SellOrderInfoNormalized } from 'pages/Projects/hooks/useProjectsSellOrders';

export const getSellOrderLabel = (
  sellOrder: SellOrderInfoNormalized,
): string => {
  const { id, askAmount, askDenom = '', quantity } = { ...sellOrder };
  const denom = formatDenom(askDenom);
  return `${id} (${askAmount} ${denom}/credit: ${quantity} credit(s) available)`;
};

/**
 * Convert Cosmos-style micro denom (starting with u) to natural denom.
 * Example uregen -> REGEN
 */
export const formatDenom = (askDenom: string): string => {
  return askDenom.substring(1).toUpperCase();
};
