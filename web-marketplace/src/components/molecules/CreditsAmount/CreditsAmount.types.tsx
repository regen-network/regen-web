import { ChangeEvent } from 'react';
import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { AllowedDenoms } from '../DenomLabel/DenomLabel.utils';

export type Currency = {
  askBaseDenom: string;
  askDenom: string;
};
export interface CreditsAmountProps {
  creditsAvailable: number;
  setCreditsAvailable: UseStateSetter<number>;
  filteredCryptoSellOrders: Array<UISellOrderInfo>;
  cardSellOrders: Array<CardSellOrder>;
  cryptoCurrencies: Currency[];
  allowedDenoms?: AllowedDenoms;
  creditTypePrecision?: number | null;
  currency: Currency;
  card: boolean;
  orderedSellOrders: UISellOrderInfo[];
}

export interface CreditsInputProps {
  creditsAvailable: number;
  handleCreditsAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  orderedSellOrders: UISellOrderInfo[];
  creditTypePrecision?: number | null;
}

export interface CurrencyInputProps {
  maxCurrencyAmount: number;
  selectPlaceholderAriaLabel: string;
  selectAriaLabel: string;
  handleCurrencyAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  cryptoCurrencies: Currency[];
  allowedDenoms?: AllowedDenoms;
  displayDenom: string;
  orderedSellOrders: UISellOrderInfo[];
  creditTypePrecision?: number | null;
}
