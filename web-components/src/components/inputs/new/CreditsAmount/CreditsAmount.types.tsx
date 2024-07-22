import { ChangeEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { CryptoCurrencies } from 'src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { PaymentOptionsType } from 'src/components/form/BuyCreditsForm/BuyCreditsForm.types';

export interface CreditsAmountProps {
  creditsAvailable: number;
  paymentOption: PaymentOptionsType;
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
