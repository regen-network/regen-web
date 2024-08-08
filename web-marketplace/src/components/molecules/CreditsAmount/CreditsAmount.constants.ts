import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export const CREDITS_AMOUNT = 'creditsAmount';
export const CURRENCY_AMOUNT = 'currencyAmount';
export const DEFAULT_CRYPTO_CURRENCY = CURRENCIES.uregen;

export const cryptoOptions = [
  {
    label: 'Retire credits now',
    description:
      'These credits will be retired upon purchase and will not be tradeable. Retirement is permanent and non-reversible.',
    linkTo:
      'https://guides.regen.network/guides/regen-marketplace-buyers-guides/ecocredits/retire-ecocredits/retirement-certification#individual-entity-credit-retirement.',
  },
  {
    label: 'Buy tradable ecocredits',
    description:
      'These credits will be a tradeable asset. They can be retired later via Regen Marketplace.',
    linkTo:
      'https://guides.regen.network/guides/regen-marketplace-buyers-guides/ecocredits/retire-ecocredits/retirement-certification#individual-entity-credit-retirement.',
  },
];
