import { UseFormReturn } from 'react-hook-form';

import {
  validateAmount,
  validateMemoLength,
} from 'web-components/src/components/inputs/validation';

import { INVALID_MEMO_LENGTH } from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { CreditRetireFormSchemaType } from './CreditRetireForm.schema';

type Props = {
  values: CreditRetireFormSchemaType;
  availableTradableAmount: number;
  requiredMessage: string;
  invalidAmount: string;
  insufficientCredits: string;
  invalidDecimalCount: string;
  _: TranslatorType;
  setError: UseFormReturn<CreditRetireFormSchemaType>['setError'];
};

export const validateCreditRetireForm = ({
  values,
  availableTradableAmount,
  requiredMessage,
  invalidAmount,
  insufficientCredits,
  invalidDecimalCount,
  _,
  setError,
}: Props): boolean => {
  let hasError = false;

  const errAmount = validateAmount({
    availableTradableAmount,
    amount: values.amount,
    requiredMessage,
    invalidAmount,
    insufficientCredits,
    invalidDecimalCount,
  });
  if (errAmount) {
    setError('amount', { message: errAmount });
    hasError = true;
  }

  if (
    values.retireFields?.[0]?.note &&
    !validateMemoLength(values.retireFields?.[0]?.note)
  ) {
    setError('retireFields.0.note', { message: _(INVALID_MEMO_LENGTH) });
    hasError = true;
  }

  return hasError;
};
