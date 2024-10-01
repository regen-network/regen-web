/* eslint-disable lingui/no-unlocalized-strings */
import { USD_DENOM } from 'config/allowedBaseDenoms';

import { OrderSummarySectionProps } from './Order.types';

export const retirementInfo: OrderSummarySectionProps = {
  tradableCredits: null,
  reason:
    'For the betterment of my children lorem ipsum. For the betterment children lorem ipsum. For the betterment of my children lorem ipsum.',
  location: 'location',
  makeAnonymous: false,
};

export const blockchainDetails: OrderSummarySectionProps = {
  purchaseDate: 'Dec 15, 2024',
  blockchainRecord: 'd6jfk121o54ded6jfk121o54de',
};

export const credits: OrderSummarySectionProps = {
  credits: '2',
  price: '40',
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
};

export const paymentInfo: OrderSummarySectionProps = {
  askDenom: USD_DENOM,
  askBaseDenom: USD_DENOM,
  nameOnCard: 'Steph Green',
  cardLast4: '1234',
};
