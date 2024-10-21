import { i18n } from '@lingui/core';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { z } from 'zod';

import {
  MAX_AMOUNT,
  MAX_CREDITS,
  POSITIVE_NUMBER,
} from './ChooseCreditsForm.constants';

export const createChooseCreditsFormSchema = ({
  creditsAvailable,
  spendingCap,
}: {
  creditsAvailable: number;
  spendingCap: number;
}) => {
  return z.object({
    [CURRENCY_AMOUNT]: z.coerce
      .number()
      .positive(i18n._(POSITIVE_NUMBER))
      .max(
        spendingCap,
        `${i18n._(MAX_AMOUNT)} ${spendingCap.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ),
    [CREDITS_AMOUNT]: z.coerce
      .number()
      .positive(i18n._(POSITIVE_NUMBER))
      .max(creditsAvailable, `${i18n._(MAX_CREDITS)} ${creditsAvailable}`),
    [SELL_ORDERS]: z.array(
      z.object({
        sellOrderId: z.string(),
        batchDenom: z.string(),
        quantity: z.string(),
        price: z.number().optional(),
        bidPrice: z
          .object({ amount: z.string(), denom: z.string() })
          .optional(),
      }),
    ),
    [CREDIT_VINTAGE_OPTIONS]: z.array(z.string()),
    [CURRENCY]: z.object({
      askDenom: z.string(),
      askBaseDenom: z.string(),
    }),
  });
};

export type ChooseCreditsFormSchemaType = z.infer<
  ReturnType<typeof createChooseCreditsFormSchema>
>;
