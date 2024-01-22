import { UseFormReturn } from 'react-hook-form';

import {
  invalidMemoLength,
  validateAmount,
  validateMemoLength,
} from 'web-components/src/components/inputs/validation';

import { CreditRetireFormSchemaType } from './CreditRetireForm.schema';

type Props = {
  values: CreditRetireFormSchemaType;
  availableTradableAmount: number;
  setError: UseFormReturn<CreditRetireFormSchemaType>['setError'];
};

export const validateCreditRetireForm = ({
  values,
  availableTradableAmount,
  setError,
}: Props): boolean => {
  let hasError = false;

  const errAmount = validateAmount(availableTradableAmount, values.amount);
  if (errAmount) {
    setError('amount', { message: errAmount });
    hasError = true;
  }

  if (
    values.retireFields?.[0]?.note &&
    !validateMemoLength(values.retireFields?.[0]?.note)
  ) {
    setError('retireFields.0.note', { message: invalidMemoLength });
    hasError = true;
  }

  return hasError;
};
