/* eslint-disable lingui/no-unlocalized-strings */
import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { REGEN_DENOM, USD_DENOM, USDC_DENOM } from 'config/allowedBaseDenoms';

import {
  BlockchainDetailsData,
  CreditsData,
  PaymentInfoData,
  RetirementInfoData,
} from './Order.types';

export const retirementInfo: RetirementInfoData = {
  retiredCredits: true,
  reason:
    'For the betterment of my children lorem ipsum. For the betterment children lorem ipsum. For the betterment of my children lorem ipsum.',
  location: 'location',
  makeAnonymous: false,
  certificateNodeId: 'abcde',
};

export const blockchainDetails: BlockchainDetailsData = {
  purchaseDate: 'Dec 15, 2024',
  blockchainRecord: 'd6jfk121o54ded6jfk121o54de',
};

export const credits: CreditsData = {
  credits: '2',
  totalPrice: '40',
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
};

export const paymentInfo: PaymentInfoData = {
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
  cardLast4: '1234',
  cardBrand: 'Visa',
};

export const allowedDenoms = [
  {
    displayDenom: 'regen',
    bankDenom: REGEN_DENOM,
    exponent: 6,
  },
  {
    displayDenom: USDC_DENOM,
    bankDenom: 'ibc/123',
    exponent: 6,
  },
  {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    displayDenom: 'USDC.axl',
    bankDenom: 'ibc/456',
    exponent: 6,
  },
  {
    displayDenom: 'evmos',
    bankDenom: 'ibc/789',
    exponent: 18,
  },
] as AllowedDenom[];
