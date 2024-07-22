import { ChangeEvent, ReactNode } from 'react';

export type PaymentOptionsType = 'card' | 'crypto';

export const PAYMENT_OPTIONS = {
  CARD: 'card',
  CRYPTO: 'crypto',
} as const;

export interface BuyCreditButtonProps {
  children: ReactNode;
  value: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
