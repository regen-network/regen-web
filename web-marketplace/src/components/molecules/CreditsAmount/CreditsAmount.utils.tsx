import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

// TO-DO get real prices from API? => have a look at getSimplePriceQuery
export const getCurrencyPrice = (currency: Currency) => {
  switch (currency) {
    case CURRENCIES.uregen:
      return 0.75;
    case CURRENCIES.usdc:
      return 0.5423;
    case CURRENCIES.usd:
      return 0.25;
    case CURRENCIES.usdcaxl:
      return 1.2543;
    default:
      return 1;
  }
};
