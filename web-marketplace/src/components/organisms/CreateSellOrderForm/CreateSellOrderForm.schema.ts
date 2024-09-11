import { z } from 'zod';

import {
  validateAmount,
  validatePrice,
} from 'web-components/src/components/inputs/validation';

type Params = {
  availableAmountByBatch?: { [batchDenom: string]: number };
  requiredMessage: string;
  positiveNumber: string;
  invalidAmount: string;
  maximumDecimalMessage: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
};

export const createSellOrderFormSchema = ({
  availableAmountByBatch,
  requiredMessage,
  positiveNumber,
  invalidAmount,
  maximumDecimalMessage,
  insufficientCredits,
  invalidDecimalCount,
}: Params) =>
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
          value =>
            !validatePrice({
              price: value,
              requiredMessage,
              invalidAmount,
              maximumDecimalMessage,
            }),
          value => ({
            message: validatePrice({
              price: value,
              requiredMessage,
              invalidAmount,
              maximumDecimalMessage,
            }),
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
        !validateAmount({
          availableTradableAmount:
            availableAmountByBatch?.[schema.batchDenom ?? ''] ?? 0,
          amount: schema.amount,
          requiredMessage,
          invalidAmount,
          insufficientCredits,
          invalidDecimalCount,
        }),
      schema => ({
        message: validateAmount({
          availableTradableAmount:
            availableAmountByBatch?.[schema.batchDenom ?? ''] ?? 0,
          amount: schema.amount,
          requiredMessage,
          invalidAmount,
          insufficientCredits,
          invalidDecimalCount,
        }),
      }),
    );

export type CreateSellOrderFormSchemaType = z.infer<
  ReturnType<typeof createSellOrderFormSchema>
>;
