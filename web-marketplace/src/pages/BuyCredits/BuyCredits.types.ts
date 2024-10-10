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
