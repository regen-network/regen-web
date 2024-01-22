import { z } from 'zod';

import {
  positiveNumber,
  requiredMessage,
  validateAmount,
  validatePrice,
} from 'web-components/src/components/inputs/validation';

type Params = {
  availableAmountByBatch?: { [batchDenom: string]: number };
};

export const createSellOrderFormSchema = ({ availableAmountByBatch }: Params) =>
  z
    .object({
      batchDenom: z.string().nonempty(requiredMessage),
      price: z.coerce
        .number({
          required_error: requiredMessage,
          invalid_type_error: requiredMessage,
        })
        .positive(positiveNumber)
        .refine(
          value => !validatePrice(value),
          value => ({
            message: validatePrice(value),
          }),
        ),
      askDenom: z.string().nonempty(requiredMessage),
      amount: z.coerce
        .number({
          required_error: requiredMessage,
          invalid_type_error: requiredMessage,
        })
        .positive(positiveNumber),
      enableAutoRetire: z.boolean().optional(),
    })
    .refine(
      schema =>
        !validateAmount(
          availableAmountByBatch?.[schema.batchDenom ?? ''] ?? 0,
          schema.amount,
        ),
      schema => ({
        message: validateAmount(
          availableAmountByBatch?.[schema.batchDenom ?? ''] ?? 0,
          schema.amount,
        ),
      }),
    );

export type CreateSellOrderFormSchemaType = z.infer<
  ReturnType<typeof createSellOrderFormSchema>
>;
