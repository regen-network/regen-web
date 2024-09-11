import { msg } from '@lingui/macro';

export const PAYMENT_OPTIONS = {
  CARD: 'card',
  CRYPTO: 'crypto',
} as const;

export const MAX_AMOUNT = msg`Amount cannot exceed`;
export const MAX_CREDITS = msg`Credits cannot exceed`;
export const POSITIVE_NUMBER = msg`Must be positive`;
