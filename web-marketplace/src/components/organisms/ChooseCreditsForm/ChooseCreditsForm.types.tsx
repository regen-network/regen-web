import { ChangeEvent, ReactNode } from 'react';

export type PaymentOptionsType = 'card' | 'crypto';

export interface ChooseCreditButtonProps {
  children: ReactNode;
  value: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
