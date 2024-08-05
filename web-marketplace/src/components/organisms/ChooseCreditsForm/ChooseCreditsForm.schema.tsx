import { z } from 'zod';

import {
  positiveNumber,
  requiredMessage,
} from 'web-components/src/components/inputs/validation';

export const chooseCreditsFormSchema = z.object({
  amountCurrency: z
    .number({
      invalid_type_error: requiredMessage,
    })
    .positive(positiveNumber),
  amountCredits: z
    .number({
      invalid_type_error: requiredMessage,
    })
    .positive(positiveNumber),
  cryptoPurchaseOption: z.string(),
  creditVintageOptions: z.array(z.string()),
});

export type ChooseCreditsFormSchemaType = z.infer<
  typeof chooseCreditsFormSchema
>;
