import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

export const cryptoSellOrders = [
  {
    id: 1,
    askDenom: CURRENCIES.uregen,
    askAmount: '10',
    quantity: '100',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: true,
  },
  {
    id: 2,
    askDenom: CURRENCIES.uregen,
    askAmount: '20',
    quantity: '10',
    seller: 'addr2',
    batchDenom: 'C01-20180101-20190101-001',
    disableAutoRetire: false,
  },
  {
    id: 3,
    askDenom: CURRENCIES.usdc,
    askAmount: '2',
    quantity: '1000',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: false,
  },
  {
    id: 4,
    askDenom: CURRENCIES.usdcaxl,
    askAmount: '3',
    quantity: '10',
    batchDenom: 'C01-20190101-20200101-002',
    seller: 'addr1',
    disableAutoRetire: false,
  },
  {
    id: 5,
    askDenom: CURRENCIES.atevmos,
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
  CURRENCIES.uregen,
  CURRENCIES.usdc,
  CURRENCIES.usdcaxl,
  CURRENCIES.atevmos,
];
