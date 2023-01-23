import { QUANTITY_MAX_DECIMALS } from 'config/decimals';

export const maxDecimalsToStep = (maxDecimalsParam?: number): number => {
  const maxDecimals = maxDecimalsParam ?? QUANTITY_MAX_DECIMALS;
  return 1 / Math.pow(10, maxDecimals);
};
