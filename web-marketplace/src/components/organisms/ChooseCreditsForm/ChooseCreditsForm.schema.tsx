import { i18n } from '@lingui/core';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { z } from 'zod';

import {
  MAX_AMOUNT,
  MAX_CREDITS,
  POSITIVE_NUMBER,
} from './ChooseCreditsForm.constants';

export const createChooseCreditsFormSchema = ({
  creditsCap,
  spendingCap,
}: {
  creditsCap: number;
  spendingCap: number;
}) => {
  return z.object({
    [CURRENCY_AMOUNT]: z.coerce
      .number()
      .positive(POSITIVE_NUMBER)
      .max(
        spendingCap,
        `${i18n._(MAX_AMOUNT)} ${spendingCap.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ),
    [CREDITS_AMOUNT]: z.coerce
      .number()
      .positive(POSITIVE_NUMBER)
      .max(creditsCap, `${i18n._(MAX_CREDITS)} ${creditsCap}`),
    [CREDIT_VINTAGE_OPTIONS]: z.array(z.string()),
  });
};

export type ChooseCreditsFormSchemaType = z.infer<
  ReturnType<typeof createChooseCreditsFormSchema>
>;
