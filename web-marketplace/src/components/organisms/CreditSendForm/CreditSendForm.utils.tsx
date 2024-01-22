import { UseFormReturn } from 'react-hook-form';

import {
  invalidMemoLength,
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
  requirementAgreement,
  validateAmount,
  validateMemoLength,
} from 'web-components/src/components/inputs/validation';

import { CreditSendFormSchemaType } from './CreditSendForm.schema';

type Props = {
  values: CreditSendFormSchemaType;
  addressPrefix?: string;
  availableTradableAmount: number;
  setError: UseFormReturn<CreditSendFormSchemaType>['setError'];
};

/**
 * Validation:
 *    sender: must be a valid address, and their signature must be present in the transaction
 *    recipient: must be a valid address
 *    credits: must not be empty
 *    batch_denom: must be a valid batch denomination
 *    amount: must not be negative
 *    retirement_location: must be a valid location
 */

export const validateCreditSendForm = ({
  values,
  addressPrefix,
  availableTradableAmount,
  setError,
}: Props): boolean => {
  let hasError = false;

  if (!values.sender) {
    setError('sender', { type: 'required', message: requiredMessage });
    hasError = true;
  }

  if (!values.recipient) {
    setError('recipient', { type: 'required', message: requiredMessage });
    hasError = true;
  }

  if (values.recipient && !isValidAddress(values.recipient, addressPrefix)) {
    setError('recipient', { message: invalidRegenAddress });
    hasError = true;
  }

  // TODO: temporarily disable sending credits to the same account
  if (values.sender && values.recipient && values.sender === values.recipient) {
    setError('recipient', {
      message: 'The recipient address cannot be the same as the sender address',
    });
    hasError = true;
  }

  const errAmount = validateAmount(availableTradableAmount, values.amount);
  if (errAmount) {
    setError('amount', { message: errAmount });
    hasError = true;
  }

  if (!values.agreeErpa) {
    setError('agreeErpa', { message: requirementAgreement });
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
