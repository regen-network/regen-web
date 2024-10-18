import { msg } from '@lingui/macro';

export const ORDER_STATUS = {
  delivered: 'delivered',
  pending: 'pending',
} as const;

export const CREDITS_DELIVERED = msg`Credits delivered`;
export const CREDIT_ISSUANCE_PENDING = msg`Credit issuance pending`;
