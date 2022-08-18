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
export const microToDenom = (amount?: string | number): number => {
  if (!amount) return 0;
  const price = typeof amount === 'string' ? Number(amount) : amount;
  return price / Math.pow(10, 6);
};

/**
 * Convert readable full-denom amount to micro denom amount
 * Example 8 REGEN -> 8000000 uregen
 */
export const denomToMicro = (amount?: string | number): number => {
  if (!amount) return 0;
  const price = typeof amount === 'string' ? Number(amount) : amount;
  return price * Math.pow(10, 6);
};
