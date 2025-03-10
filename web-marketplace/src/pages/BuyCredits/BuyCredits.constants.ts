import { msg } from '@lingui/macro';

export const PAYMENT_OPTIONS = {
  CARD: 'card',
  CRYPTO: 'crypto',
} as const;
export const NEXT = msg`next`;
export const INSUFFICIENT_BALANCE = msg`Insufficient balance`;

export const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const VIEW_CERTIFICATE = msg`view retirement certificate`;
export const PURCHASE_SUCCESSFUL = msg`Congrats! Your purchase was successful.`;
export const CHOOSE_CREDITS = msg`Choose credits`;
export const PAYMENT_INFO = msg`Payment info`;
export const CUSTOMER_INFO = msg`Customer info`;
export const RETIREMENT = msg`Retirement`;
export const AGREE_PURCHASE = `Agree & purchase`;
export const COMPLETE = msg`Complete`;
export const EMAIL_RECEIPT = msg`We have emailed you a receipt to`;
export const BUY_CREDITS_FORM_PREFIX = 'buy-credits-';
