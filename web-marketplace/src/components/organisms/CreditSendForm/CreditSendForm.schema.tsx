import { z } from 'zod';

import { isValidAddress } from 'web-components/src/components/inputs/validation';

import { RetireFormSchema } from '../CreditRetireForm/CreditRetireForm.schema';

type Params = {
  addressPrefix?: string;
  requiredMessage: string;
  invalidRegenAddress: string;
};

export const getCreditSendFormSchema = ({
  addressPrefix,
  requiredMessage,
  invalidRegenAddress,
}: Params) =>
  z.object({
    sender: z.string(),
    recipient: z
      .string()
      .refine(value => !!value, {
        message: requiredMessage,
      })
      .refine(value => isValidAddress(value, addressPrefix), {
        message: invalidRegenAddress,
      }),
    withRetire: z.boolean().optional(),
    agreeErpa: z.boolean(),
    amount: z.coerce.number(),
    retireFields: z.array(RetireFormSchema).optional(),
  });

export type CreditSendFormSchemaType = z.infer<
  ReturnType<typeof getCreditSendFormSchema>
>;
