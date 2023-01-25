import { SELL_ORDERS_HEADERS } from './SellOrdersTable.types';

export const MAXIMUM_FRACTION_DIGITS = 2;
export const MINIMUM_FRACTION_DIGITS = 2;
export const PURCHASE_OPTION_TOOLTIP =
  'Ecocredits from some sell orders can only be purchased in a retired state. Others can be purchased in a tradable state, which can then be retired later, sold, or sent to another address.';

export const SELL_ORDERS_MAPPING: Record<
  SELL_ORDERS_HEADERS,
  { name: string; sortKey: string; sortEnabled?: boolean }
> = {
  [SELL_ORDERS_HEADERS.ID]: {
    name: 'SELL ORDER ID',
    sortKey: 'id',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.PROJECT]: {
    name: 'PROJECT',
    sortKey: 'project',
  },
  [SELL_ORDERS_HEADERS.PRICE]: {
    name: 'PRICE (USD)',
    sortKey: 'price',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.CURRENCY_DENOM]: {
    name: 'CURRENCY DENOM',
    sortKey: 'currency-denom',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.AMOUNT]: {
    name: 'AMOUNT AVAILABLE',
    sortKey: 'amount',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.CREDIT_CLASS]: {
    name: 'CREDIT CLASS',
    sortKey: 'credit-class',
  },
  [SELL_ORDERS_HEADERS.BATCH_DENOM]: {
    name: 'BATCH DENOM',
    sortKey: 'batch-denom',
    sortEnabled: true,
  },
  [SELL_ORDERS_HEADERS.PURCHASE_OPTIONS]: {
    name: 'PURCHASE OPTIONS',
    sortKey: 'purchase-options',
  },
  [SELL_ORDERS_HEADERS.BATCH_START_DATE]: {
    name: 'BATCH START DATE',
    sortKey: 'start-date',
  },
  [SELL_ORDERS_HEADERS.BATCH_END_DATE]: {
    name: 'BATCH END DATE',
    sortKey: 'end-date',
  },
  [SELL_ORDERS_HEADERS.SELLER]: { name: 'SELLER', sortKey: 'seller' },
};
