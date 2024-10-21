import { msg } from '@lingui/macro';

export const PAYMENT_OPTIONS = {
  CARD: 'card',
  CRYPTO: 'crypto',
} as const;
export const NEXT = msg`next`;

export const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const VIEW_CERTIFICATE = msg`view retirement certificate`;
export const PURCHASE_SUCCESSFUL = msg`Congrats! Your purchase was successful.`;
