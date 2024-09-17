import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { CURRENCIES } from 'components/atoms/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export const cryptoSellOrders = [
  {
    id: '1',
    askBaseDenom: CURRENCIES.uregen,
    askDenom: CURRENCIES.uregen,
    askAmount: '10',
    quantity: '100',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: true,
  },
  {
    id: '2',
    askBaseDenom: CURRENCIES.uregen,
    askDenom: CURRENCIES.uregen,
    askAmount: '20',
    quantity: '10',
    seller: 'addr2',
    batchDenom: 'C01-20180101-20190101-001',
    disableAutoRetire: false,
  },
  {
    id: '3',
    askBaseDenom: CURRENCIES.usdc,
    askDenom: 'ibc/123',
    askAmount: '2',
    quantity: '1000',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: false,
  },
  {
    id: '4',
    askBaseDenom: CURRENCIES.usdcaxl,
    askDenom: 'ibc/456',
    askAmount: '3',
    quantity: '10',
    batchDenom: 'C01-20190101-20200101-002',
    seller: 'addr1',
    disableAutoRetire: false,
  },
  {
    id: '5',
    askBaseDenom: CURRENCIES.atevmos,
    askDenom: 'ibc/567',
    askAmount: '4',
    quantity: '5',
    batchDenom: 'C01-20180101-20190101-001',
    seller: 'addr1',
    disableAutoRetire: true,
  },
] as Array<UISellOrderInfo>;

export const cardSellOrders = cryptoSellOrders.map((order, i) => ({
  usdPrice: i + 1,
  ...order,
}));

export const cryptoCurrencies = [
  { askDenom: CURRENCIES.uregen, askBaseDenom: CURRENCIES.uregen },
  { askDenom: 'ibc/123', askBaseDenom: CURRENCIES.usdc },
  { askDenom: 'ibc/456', askBaseDenom: CURRENCIES.usdcaxl },
  { askDenom: 'ibc/789', askBaseDenom: CURRENCIES.atevmos },
];

export const allowedDenoms = [
  {
    displayDenom: 'regen',
    bankDenom: CURRENCIES.uregen,
  },
  {
    displayDenom: 'USDC',
    bankDenom: 'ibc/123',
  },
  {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    displayDenom: 'USDC.axl',
    bankDenom: 'ibc/456',
  },
  {
    displayDenom: 'evmos',
    bankDenom: 'ibc/789',
  },
];
