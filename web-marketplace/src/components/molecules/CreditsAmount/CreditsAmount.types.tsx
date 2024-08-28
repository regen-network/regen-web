import { ChangeEvent } from 'react';

import {
  CryptoCurrencies,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export type PaymentOptionsType = 'card' | 'crypto';
export interface CreditsAmountProps {
  creditsAvailable: {
    credits: number;
    currency: Currency;
  }[];
  paymentOption: PaymentOptionsType;
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  paymentOption: PaymentOptionsType;
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  paymentOption: PaymentOptionsType;
  handleCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (currency: CryptoCurrencies | string) => void;
  defaultCryptoCurrency: CryptoCurrencies;
}
