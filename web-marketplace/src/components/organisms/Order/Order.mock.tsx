/* eslint-disable lingui/no-unlocalized-strings */
import { REGEN_DENOM, USD_DENOM } from 'config/allowedBaseDenoms';

import {
  BlockchainDetailsData,
  CreditsData,
  PaymentInfoData,
  RetirementInfoData,
} from './Order.types';

export const retirementInfo: RetirementInfoData = {
  tradableCredits: null,
  reason:
    'For the betterment of my children lorem ipsum. For the betterment children lorem ipsum. For the betterment of my children lorem ipsum.',
  location: 'location',
  makeAnonymous: false,
};

export const blockchainDetails: BlockchainDetailsData = {
  purchaseDate: 'Dec 15, 2024',
  blockchainRecord: 'd6jfk121o54ded6jfk121o54de',
};

export const credits: CreditsData = {
  credits: '2',
  price: '40',
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
};

export const paymentInfo: PaymentInfoData = {
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
  nameOnCard: 'Steph Green',
  cardLast4: '1234',
  cardBrand: 'Visa',
};

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
