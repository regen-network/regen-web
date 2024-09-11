import { z } from 'zod';

import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

export const paymentInfoFormSchema = (paymentOption: PaymentOptionsType) =>
  z.object({
    name: paymentOption === 'card' ? z.string().min(1) : z.string(),
    email:
      paymentOption === 'card'
        ? z.string().email().min(1)
        : z.union([z.literal(''), z.string().email()]),
    createAccount: z.boolean(),
    savePaymentMethod: z.boolean(),
    paymentMethodId: z.string().optional(),
  });

export type PaymentInfoFormSchemaType = z.infer<
  ReturnType<typeof paymentInfoFormSchema>
>;
