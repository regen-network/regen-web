import { UseFormReturn } from 'react-hook-form';

import {
  invalidMemoLength,
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
  requirementAgreement,
  validateAmount,
  validateMemoLength,
} from 'web-components/lib/components/inputs/validation';

import { CreditSendFormSchemaType } from './CreditSendForm.schema';

type Props = {
  values: CreditSendFormSchemaType;
  addressPrefix?: string;
  availableTradableAmount: number;
  setError: UseFormReturn<CreditSendFormSchemaType>['setError'];
};

export const validateCreditSendForm = ({
  values,
  addressPrefix,
  availableTradableAmount,
  setError,
}: Props): void => {
  if (!values.sender) {
    setError('sender', { type: 'required', message: requiredMessage });
  }

  if (!values.recipient) {
    setError('recipient', { type: 'required', message: requiredMessage });
  }

  if (values.recipient && !isValidAddress(values.recipient, addressPrefix)) {
    setError('recipient', { message: invalidRegenAddress });
  }

  // TODO: temporarily disable sending credits to the same account
  if (values.sender && values.recipient && values.sender === values.recipient) {
    setError('recipient', {
      message: 'The recipient address cannot be the same as the sender address',
    });
  }

  const errAmount = validateAmount(availableTradableAmount, values.amount);
  if (errAmount) {
    setError('amount', { message: errAmount });
  }

  if (!values.agreeErpa) {
    setError('agreeErpa', { message: requirementAgreement });
  }

  if (
    values.retireFields?.[0]?.note &&
    !validateMemoLength(values.retireFields?.[0]?.note)
  ) {
    setError('retireFields.0.note', { message: invalidMemoLength });
  }

  return;
};
