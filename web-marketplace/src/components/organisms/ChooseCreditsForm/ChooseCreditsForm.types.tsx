import { ChangeEvent, ReactNode } from 'react';

import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export type PaymentOptionsType = 'card' | 'crypto';

export interface ChooseCreditButtonProps {
  children: ReactNode;
  value: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CreditDetails {
  availableCredits: number;
  currency: Currency;
  creditPrice: number;
}

export interface CreditsVintages {
  date: string;
  credits: string;
  batchDenom: string;
}
