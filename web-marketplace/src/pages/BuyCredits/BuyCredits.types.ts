import { FailedFnType } from 'lib/atoms/error.atoms';

import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { AgreePurchaseFormSchemaType } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm.schema';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { PaymentInfoFormSchemaType } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.schema';

export type PaymentOptionsType = 'card' | 'crypto';
export type CardDetails = {
  brand: string;
  last4: string;
  country: string | null;
};
export type BuyCreditsSchemaTypes = {
  paymentOption?: PaymentOptionsType;
  retiring?: boolean;
} & Partial<ChooseCreditsFormSchemaType> &
  Partial<PaymentInfoFormSchemaType> &
  Partial<AgreePurchaseFormSchemaType>;

export type SendOrderConfirmationEmailParams = {
  currency: Currency;
  retiring: boolean;
  email: string;
  currencyAmount: number;
  displayDenom: string;
  projectName: string;
  creditsAmount: number;
  txHash: string;
  token: string;
  retryCsrfRequest: (failedFunction: FailedFnType) => Promise<void>;
  certificateHref: string;
};
