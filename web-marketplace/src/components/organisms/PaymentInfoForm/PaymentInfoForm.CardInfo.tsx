import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Trans } from '@lingui/react/macro';
import { PaymentElement } from '@stripe/react-stripe-js';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { Body } from 'web-components/src/components/typography';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { paymentElementOptions } from './PaymentInfoForm.constants';
import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';

type CardInfoProps = {
  accountId?: string;
  className?: string;
  setPaymentInfoValid: UseStateSetter<boolean>;
};
export const CardInfo = ({
  accountId,
  className,
  setPaymentInfoValid,
}: CardInfoProps) => {
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, control, setValue } = ctx;
  const { handleSave: updateMultiStepData, activeStep, data } = useMultiStep();

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

  useEffect(() => {
    updateMultiStepData(
      {
        ...data,
        savePaymentMethod,
      },
      activeStep,
    );
    // Intentionally omit `updateMultiStepData` and `data` from the dependency array
    // because including them trigger unnecessary renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savePaymentMethod, activeStep]);

  return (
    <div className={className}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        onChange={event => setPaymentInfoValid(event.complete)}
      />
      <CheckboxLabel
        className="pt-30"
        checked={savePaymentMethod}
        disabled={!createAccount && !accountId}
        label={
          <Body size="sm" className="text-grey-700">
            <Trans>Save my credit card info for next time</Trans>
          </Body>
        }
        {...register('savePaymentMethod')}
      />
    </div>
  );
};
