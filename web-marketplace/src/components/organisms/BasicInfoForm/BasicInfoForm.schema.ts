import { z } from 'zod';

import {
  positiveNumber,
  requiredMessage,
} from 'web-components/src/components/inputs/validation';

export const basicInfoFormSchema = z.object({
  'schema:name': z.string().nonempty(requiredMessage),
  'regen:projectSize': z.object({
    'qudt:numericValue': z
      .number({
        invalid_type_error: requiredMessage,
      })
      .positive(positiveNumber)
      .optional(),
    'qudt:unit': z.string(),
  }),
});

export type BasicInfoFormSchemaType = z.infer<typeof basicInfoFormSchema>;
