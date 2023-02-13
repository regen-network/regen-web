/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from 'zod';

import {
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
} from 'web-components/lib/components/inputs/validation';

import { RetireFormSchema } from '../CreditRetireForm/CreditRetireForm.schema';

type Params = {
  addressPrefix?: string;
};

export const CreditSendFormSchema = ({ addressPrefix }: Params) =>
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
  ReturnType<typeof CreditSendFormSchema>
>;
