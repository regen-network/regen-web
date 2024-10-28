import {
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';

import { Currency } from '../CreditsAmount/CreditsAmount.types';
import { AllowedDenoms } from '../DenomLabel/DenomLabel.utils';

export interface OrderProps {
  projectName: string;
  prefinanceProject: boolean;
  pricePerCredit: number;
  credits: number;
  currencyAmount: number;
  currency: Currency;
  image: string;
}

export interface OrderSummaryProps {
  order: OrderProps;
  cardDetails?: CardDetails;
  imageAltText: string;
  paymentOption: PaymentOptionsType;
  allowedDenoms: AllowedDenoms;
  onClickEditCard: () => void;
  setCreditsAmount: (creditsAmount: number) => void;
  creditsAvailable: number;
  onInvalidCredits?: () => void;
  userBalance: number;
}
