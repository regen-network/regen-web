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
  /** The currency used for the transaction */
  currency: Currency;
  /** Whether the credits are being retired or kept tradable */
  retiring: boolean;
  /** Recipient's email address */
  email: string;
  /** The amount paid in the transaction currency */
  currencyAmount: number;
  /** Display denomination of the currency */
  displayDenom: string;
  /** Name of the project credits are purchased from */
  projectName: string;
  /** Amount of credits purchased */
  creditsAmount: number;
  /** Transaction hash */
  txHash: string;
  /** Authentication CSRF token */
  token: string;
  /** Function to retry request if CSRF token is invalid */
  retryCsrfRequest: (failedFunction: FailedFnType) => Promise<void>;
  /** The URL to the retirement certificate */
  certificateHref: string;
};
