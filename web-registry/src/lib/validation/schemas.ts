import { z } from 'zod';

import { requiredMsg, tooLongAddress } from './messages';

/** Regen address */
export const regenAddressSchema = z
  .string()
  .min(1, { message: requiredMsg })
  .max(16, { message: tooLongAddress });

/** Amount */
export const amountSchema = z.number().min(0.000001, { message: requiredMsg });

/** Checkbox */
export const checkboxSchema = z.boolean();

// validationRules
export const schemas = {
  regenAddress: regenAddressSchema,
  amount: amountSchema,
  checkbox: checkboxSchema,
};
