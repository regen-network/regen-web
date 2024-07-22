import {
  positiveNumber,
  requiredMessage,
} from 'web-components/src/components/inputs/validation';
import { z } from 'zod';

export const buyCreditsFormSchema = z.object({
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

export type FormFields = z.infer<typeof buyCreditsFormSchema>;
