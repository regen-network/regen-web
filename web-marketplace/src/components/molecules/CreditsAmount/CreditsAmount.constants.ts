import { msg } from '@lingui/macro';

export const CREDITS_AMOUNT = 'creditsAmount';
export const CURRENCY_AMOUNT = 'currencyAmount';
export const CURRENCY = 'currency';
export const CREDIT_VINTAGE_OPTIONS = 'creditVintageOptions';
export const SELL_ORDERS = 'sellOrders';
export const MIN_USD_CURRENCY_AMOUNT = 0.5;

export const cryptoOptions = [
  {
    label: msg`Retire credits now`,
    description: msg`These credits will be retired upon purchase and will not be tradeable. Retirement is permanent and non-reversible.`,
    linkTo:
      'https://guides.regen.network/guides/regen-marketplace-buyers-guides/ecocredits/retire-ecocredits/retirement-certification#individual-entity-credit-retirement.',
    value: true,
  },
  {
    label: msg`Buy tradable ecocredits`,
    description: msg`These credits will be a tradeable asset. They can be retired later via Regen Marketplace.`,
    linkTo:
      'https://guides.regen.network/guides/regen-marketplace-buyers-guides/ecocredits/retire-ecocredits/retirement-certification#individual-entity-credit-retirement.',
    value: false,
  },
];

export const SET_MAX_CREDITS_ARIA_LABEL = msg`Set max credits`;
export const SET_MAX_CREDITS_BUTTON_TEXT = msg`Max`;
