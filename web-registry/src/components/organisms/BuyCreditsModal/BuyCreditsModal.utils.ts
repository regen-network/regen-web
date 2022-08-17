import { SellOrderInfoNormalized } from 'pages/Projects/hooks/useProjectsSellOrders';

export const getSellOrderLabel = (
  sellOrder: SellOrderInfoNormalized,
): string => {
  const { id, askAmount, askDenom = '', quantity } = { ...sellOrder };
  const denom = formatDenomText(askDenom);
  const price = microToDenom(askAmount);
  return `${id} (${price} ${denom}/credit: ${quantity} credit(s) available)`;
};

/**
 * Convert Cosmos-style micro denom (starting with u) to natural denom.
 * Example uregen -> REGEN
 */
export const formatDenomText = (askDenom: string): string => {
  return askDenom.substring(1).toUpperCase();
};

/**
 * Convert Cosmos-style micro denom amount to readable full-denom amount
 * Example 7000000 uregen -> 7 REGEN
 */
export const microToDenom = (askAmount: string): number => {
  return parseInt(askAmount) / Math.pow(10, 6);
};
