import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PaymentElement } from '@stripe/react-stripe-js';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { Body } from 'web-components/src/components/typography';

import { paymentElementOptions } from './PaymentInfoForm.constants';
import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';

type CardInfoProps = {
  accountId?: string;
  className?: string;
};
export const CardInfo = ({ accountId, className }: CardInfoProps) => {
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, control, setValue } = ctx;

  const createAccount = useWatch({
    control: control,
    name: 'createAccount',
  });
  const savePaymentMethod = useWatch({
    control: control,
    name: 'savePaymentMethod',
  });

  useEffect(() => {
    setValue('savePaymentMethod', createAccount);
  }, [createAccount, setValue]);

  return (
    <div className={className}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <CheckboxLabel
        className="pt-30"
        checked={savePaymentMethod}
        disabled={!createAccount && !accountId}
        label={<Body size="sm">Save my credit card info for next time</Body>}
        {...register('savePaymentMethod')}
      />
    </div>
  );
};
