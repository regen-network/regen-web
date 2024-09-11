import { ChangeEvent } from 'react';
import {
  CreditDetails,
  CreditsVintages,
} from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import {
  CryptoCurrencies,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

export interface CreditsAmountProps {
  creditDetails: CreditDetails[];
  paymentOption: PaymentOptionsType;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  setSpendingCap: (spendingCap: number) => void;
  creditsAvailable: number;
  setCreditsAvailable: (creditsAvailable: number) => void;
  creditVintages: CreditsVintages[];
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
