import {
  REGEN_DENOM,
  USD_DENOM,
  USDC_DENOM,
  USDCAXL_DENOM,
} from 'web-marketplace/src/config/allowedBaseDenoms';

export const CURRENCIES = {
  usd: USD_DENOM,
  usdc: USDC_DENOM,
  uregen: REGEN_DENOM,
  usdcaxl: USDCAXL_DENOM,
} as const;

export type Currency = keyof typeof CURRENCIES;
export type CryptoCurrencies = Exclude<keyof typeof CURRENCIES, 'usd'>;
