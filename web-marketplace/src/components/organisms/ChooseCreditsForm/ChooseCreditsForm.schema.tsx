import { i18n } from '@lingui/core';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { z } from 'zod';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import {
  MAX_AMOUNT,
  MAX_CREDITS,
  NOT_ENOUGH_BALANCE,
  POSITIVE_NUMBER,
} from './ChooseCreditsForm.constants';

export const createChooseCreditsFormSchema = ({
  creditsAvailable,
  spendingCap,
  userBalance,
  paymentOption,
}: {
  creditsAvailable: number;
  spendingCap: number;
  userBalance: number;
  paymentOption: string;
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
      )
      .refine(
        value => paymentOption === PAYMENT_OPTIONS.CARD || userBalance > value,
        {
          message: `${i18n._(NOT_ENOUGH_BALANCE)}`,
        },
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
