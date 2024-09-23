import { ChangeEvent } from 'react';
import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { AllowedDenoms } from '../DenomLabel/DenomLabel.utils';

export type Currency = {
  askBaseDenom: string;
  askDenom: string;
};
export interface CreditsAmountProps {
  paymentOption: PaymentOptionsType;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  spendingCap: number;
  setSpendingCap: UseStateSetter<number>;
  creditsAvailable: number;
  setCreditsAvailable: UseStateSetter<number>;
  filteredCryptoSellOrders: Array<UISellOrderInfo> | undefined;
  cardSellOrders: Array<CardSellOrder>;
  defaultCryptoCurrency: Currency;
  cryptoCurrencies: Currency[];
  allowedDenoms?: AllowedDenoms;
  creditTypePrecision?: number | null;
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  paymentOption: PaymentOptionsType;
  defaultCryptoCurrency: Currency;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  selectPlaceholderAriaLabel: string;
  selectAriaLabel: string;
  handleCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  cryptoCurrencies: Currency[];
  allowedDenoms?: AllowedDenoms;
  displayDenom: string;
}
