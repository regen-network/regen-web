import { ChangeEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import {
  CryptoCurrencies,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export type PaymentOptionsType = 'card' | 'crypto';
export interface CreditsAmountProps {
  creditsAvailable: number;
  paymentOption: PaymentOptionsType;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  formState: {
    isDirty: boolean;
  };
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  paymentOption: PaymentOptionsType;
  handleCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (currency: CryptoCurrencies | string) => void;
  defaultCryptoCurrency: CryptoCurrencies;
  register: UseFormRegister<FieldValues>;
  formState: {
    isDirty: boolean;
  };
}
