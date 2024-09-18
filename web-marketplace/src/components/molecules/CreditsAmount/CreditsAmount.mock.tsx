/* eslint-disable lingui/no-unlocalized-strings */
import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export const creditVintages = [
  {
    date: 'Jan 1, 2019 - December 31, 2019',
    credits: '100',
    batchDenom: 'mock-batch-denom-1',
  },
  {
    date: 'Jan 1, 2020 - December 31, 2020',
    credits: '200',
    batchDenom: 'mock-batch-denom-2',
  },
  {
    date: 'Jan 1, 2021 - December 31, 2021',
    credits: '300',
    batchDenom: 'mock-batch-denom-3',
  },
];

export const creditDetails = [
  {
    availableCredits: 1000,
    currency: CURRENCIES.usd,
    creditPrice: 1,
  },
  {
    availableCredits: 2000,
    currency: CURRENCIES.uregen,
    creditPrice: 0.5,
  },
  {
    availableCredits: 3000,
    currency: CURRENCIES.usdc,
    creditPrice: 2,
  },
  {
    availableCredits: 4000,
    currency: CURRENCIES.usdcaxl,
    creditPrice: 3,
  },
];
