import { PAYMENT_OPTIONS } from 'legacy-pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'legacy-pages/BuyCredits/BuyCredits.types';
import { z } from 'zod';

export const paymentInfoFormSchema = (paymentOption: PaymentOptionsType) =>
  z.object({
    name:
      paymentOption === PAYMENT_OPTIONS.CARD ? z.string().min(1) : z.string(),
    email:
      paymentOption === PAYMENT_OPTIONS.CARD
        ? z.string().email().min(1)
        : z.union([z.literal(''), z.string().email().nullable()]),
    createAccount: z.boolean(),
    savePaymentMethod: z.boolean(),
    paymentMethodId: z.string().optional(),
  });

export type PaymentInfoFormSchemaType = z.infer<
  ReturnType<typeof paymentInfoFormSchema>
>;
