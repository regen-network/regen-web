import { UseFormReturn } from 'react-hook-form';
import { msg } from '@lingui/macro';

import {
  isValidAddress,
  validateAmount,
  validateMemoLength,
} from 'web-components/src/components/inputs/validation';

import {
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
} from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { CreditSendFormSchemaType } from './CreditSendForm.schema';

type Props = {
  values: CreditSendFormSchemaType;
  addressPrefix?: string;
  availableTradableAmount: number;
  requiredMessage: string;
  invalidRegenAddress: string;
  requirementAgreement: string;
  invalidMemoLength: string;
  _: TranslatorType;
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
  requiredMessage,
  invalidRegenAddress,
  requirementAgreement,
  invalidMemoLength,
  _,
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
      message: _(
        msg`The recipient address cannot be the same as the sender address`,
      ),
    });
    hasError = true;
  }

  const errAmount = validateAmount({
    availableTradableAmount,
    amount: values.amount,
    requiredMessage,
    insufficientCredits: _(INSUFFICIENT_CREDITS),
    invalidAmount: _(INVALID_AMOUNT),
    invalidDecimalCount: _(INVALID_DECIMAL_COUNT),
  });
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
