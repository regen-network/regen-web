import {
  USD_CURRENCY_DENOM,
  USDC_CURRENCY_DENOM,
} from 'web-marketplace/src/config/allowedBaseDenoms';

export const CURRENCIES = {
  USD: USD_CURRENCY_DENOM,
  USDC: USDC_CURRENCY_DENOM,
} as const;

export type Currency = keyof typeof CURRENCIES;
