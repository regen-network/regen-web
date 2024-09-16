/* eslint-disable lingui/no-unlocalized-strings */
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import Long from 'long';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export const cryptoSellOrders = [
  {
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
    id: Long.fromValue(1),
    askDenom: CURRENCIES.uregen,
    askAmount: '10',
    quantity: '100',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: true,
  },
  {
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
    id: Long.fromValue(2),
    askDenom: CURRENCIES.uregen,
    askAmount: '20',
    quantity: '10',
    seller: 'addr2',
    batchDenom: 'C01-20180101-20190101-001',
    disableAutoRetire: false,
  },
  {
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
    id: Long.fromValue(3),
    askDenom: CURRENCIES.usdc,
    askAmount: '2',
    quantity: '1000',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: false,
  },
  {
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
    id: Long.fromValue(4),
    askDenom: CURRENCIES.usdcaxl,
    askAmount: '3',
    quantity: '10',
    batchDenom: 'C01-20190101-20200101-002',
    seller: 'addr1',
    disableAutoRetire: false,
  },
  {
    $type: 'regen.ecocredit.marketplace.v1.SellOrderInfo',
    id: Long.fromValue(5),
    askDenom: CURRENCIES.atevmos,
    askAmount: '4',
    quantity: '5',
    batchDenom: 'C01-20180101-20190101-001',
    seller: 'addr1',
    disableAutoRetire: true,
  },
] as Array<SellOrderInfo>;

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
