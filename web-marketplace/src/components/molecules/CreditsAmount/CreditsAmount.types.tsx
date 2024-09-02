import { ChangeEvent } from 'react';
import { CreditDetails } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import {
  CryptoCurrencies,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export type PaymentOptionsType = 'card' | 'crypto';
export interface CreditsAmountProps {
  creditDetails: CreditDetails[];
  paymentOption: PaymentOptionsType;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  paymentOption: PaymentOptionsType;
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  paymentOption: PaymentOptionsType;
  handleCurrencyChange: (currency: CryptoCurrencies | string) => void;
  defaultCryptoCurrency: CryptoCurrencies;
  creditDetails: CreditDetails[];
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}
