import { atom } from 'jotai';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { PaymentOptionsType } from './BuyCredits.types';

export const paymentOptionCryptoClickedAtom = atom(false);
export const buyFromProjectIdAtom = atom('');
export const spendingCapAtom = atom<number | null>(null);
export const paymentOptionAtom = atom<PaymentOptionsType>(
  PAYMENT_OPTIONS.CRYPTO,
);
export const cardDetailsMissingAtom = atom(null);
