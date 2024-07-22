import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

// TO-DO get real prices from API? => have a look at getSimplePriceQuery
export const getCurrencyPrice = (currency: Currency) => {
  switch (currency) {
    case CURRENCIES.uregen:
      return 2;
    case CURRENCIES.usdc:
      return 0.5;
    case CURRENCIES.usd:
      return 1;
    case CURRENCIES.usdcaxl:
      return 4;
    default:
      return 1;
  }
};
