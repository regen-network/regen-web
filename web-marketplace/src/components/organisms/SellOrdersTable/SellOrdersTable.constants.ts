import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';

import { SELL_ORDERS_HEADERS } from './SellOrdersTable.types';

export const MAXIMUM_FRACTION_DIGITS = 2;
export const MINIMUM_FRACTION_DIGITS = 2;
export const PURCHASE_OPTION_TOOLTIP = msg`Ecocredits from some sell orders can only be purchased in a retired state. Others can be purchased in a tradable state, which can then be retired later, sold, or sent to another address.`;

export const SELL_ORDERS_MAPPING: Record<
  SELL_ORDERS_HEADERS,
  { name: MessageDescriptor; sortKey: string; sortEnabled?: boolean }
> = {
  [SELL_ORDERS_HEADERS.ID]: {
    name: msg`SELL ORDER ID`,
    sortKey: 'id',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.PROJECT]: {
    name: msg`PROJECT`,
    sortKey: 'project',
  },
  [SELL_ORDERS_HEADERS.PRICE]: {
    name: msg`PRICE (USD)`,
    sortKey: 'price',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.CURRENCY_DENOM]: {
    name: msg`CURRENCY DENOM`,
    sortKey: 'currency-denom',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.AMOUNT]: {
    name: msg`AMOUNT AVAILABLE`,
    sortKey: 'amount',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.CREDIT_CLASS]: {
    name: msg`CREDIT CLASS`,
    sortKey: 'credit-class',
  },
  [SELL_ORDERS_HEADERS.BATCH_DENOM]: {
    name: msg`BATCH DENOM`,
    sortKey: 'batch-denom',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.PURCHASE_OPTIONS]: {
    name: msg`PURCHASE OPTIONS`,
    sortKey: 'purchase-options',
  },
  [SELL_ORDERS_HEADERS.BATCH_START_DATE]: {
    name: msg`BATCH START DATE`,
    sortKey: 'start-date',
  },
  [SELL_ORDERS_HEADERS.BATCH_END_DATE]: {
    name: msg`BATCH END DATE`,
    sortKey: 'end-date',
  },
  [SELL_ORDERS_HEADERS.SELLER]: { name: msg`SELLER`, sortKey: 'seller' },
};
