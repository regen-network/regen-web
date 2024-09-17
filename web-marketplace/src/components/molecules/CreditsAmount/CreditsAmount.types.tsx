import { ChangeEvent } from 'react';
import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import {
  CryptoCurrencies,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

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
  defaultCryptoCurrency: CryptoCurrencies;
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  paymentOption: PaymentOptionsType;
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  paymentOption: PaymentOptionsType;
  defaultCryptoCurrency: CryptoCurrencies;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  selectPlaceholderAriaLabel: string;
  selectAriaLabel: string;
  handleCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
