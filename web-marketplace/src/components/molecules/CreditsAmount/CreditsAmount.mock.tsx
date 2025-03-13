/* eslint-disable lingui/no-unlocalized-strings */
import {
  AXELAR_USDC_DENOM,
  EVMOS_DENOM,
  REGEN_DENOM,
  USDC_DENOM,
} from 'config/allowedBaseDenoms';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

export const cryptoSellOrders = [
  {
    id: '1',
    askBaseDenom: REGEN_DENOM,
    askDenom: REGEN_DENOM,
    askAmount: '10000000',
    quantity: '100',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: true,
  },
  {
    id: '2',
    askBaseDenom: REGEN_DENOM,
    askDenom: REGEN_DENOM,
    askAmount: '20000000',
    quantity: '10',
    seller: 'addr2',
    batchDenom: 'C01-20180101-20190101-001',
    disableAutoRetire: false,
  },
  {
    id: '3',
    askBaseDenom: USDC_DENOM,
    askDenom: 'ibc/123',
    askAmount: '2000000',
    quantity: '1000',
    seller: 'addr1',
    batchDenom: 'C01-20190101-20200101-002',
    disableAutoRetire: false,
  },
  {
    id: '4',
    askBaseDenom: AXELAR_USDC_DENOM,
    askDenom: 'ibc/456',
    askAmount: '3000000',
    quantity: '10',
    batchDenom: 'C01-20190101-20200101-002',
    seller: 'addr1',
    disableAutoRetire: false,
  },
  {
    id: '5',
    askBaseDenom: EVMOS_DENOM,
    askDenom: 'ibc/567',
    askAmount: '4000000',
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
  { askDenom: REGEN_DENOM, askBaseDenom: REGEN_DENOM },
  { askDenom: 'ibc/123', askBaseDenom: USDC_DENOM },
  { askDenom: 'ibc/456', askBaseDenom: AXELAR_USDC_DENOM },
  { askDenom: 'ibc/789', askBaseDenom: EVMOS_DENOM },
];

export const allowedDenoms = [
  {
    displayDenom: 'regen',
    bankDenom: REGEN_DENOM,
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
