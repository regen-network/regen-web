import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { z } from 'zod';

import {
  maxAmount,
  maxCredits,
  positiveNumber,
} from 'web-components/src/components/inputs/validation';

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
      .positive(positiveNumber)
      .max(
        spendingCap,
        `${maxAmount} ${spendingCap.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ),
    [CREDITS_AMOUNT]: z.coerce
      .number()
      .positive(positiveNumber)
      .max(creditsCap, `${maxCredits} ${creditsCap}`),
    retiring: z.boolean(),
    creditVintageOptions: z.array(z.string()),
  });
};

export type ChooseCreditsFormSchemaType = z.infer<
  ReturnType<typeof createChooseCreditsFormSchema>
>;
