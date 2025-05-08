import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { PaymentMethod } from '@stripe/stripe-js';

import Card from 'web-components/src/components/cards/Card';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { Title } from 'web-components/src/components/typography';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { CardInfo } from './PaymentInfoForm.CardInfo';
import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';

export type PaymentInfoProps = {
  paymentMethods?: Array<PaymentMethod> | null;
  setPaymentInfoValid: UseStateSetter<boolean>;
  accountId?: string;
};
export const PaymentInfo = ({
  paymentMethods,
  accountId,
  setPaymentInfoValid,
}: PaymentInfoProps) => {
  const { _ } = useLingui();
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, control, setValue } = ctx;
  const { handleSave: updateMultiStepData, activeStep, data } = useMultiStep();
  const createAccount = useWatch({
    control: control,
    name: 'createAccount',
  });
  const paymentMethodId = useWatch({
    control: control,
    name: 'paymentMethodId',
  });

  useEffect(() => {
    setValue('savePaymentMethod', createAccount);
    updateMultiStepData(
      {
        ...data,
        savePaymentMethod: createAccount,
        createAccount,
      },
      activeStep,
    );
    // Intentionally omit `updateMultiStepData` and `data` from the dependency array
    // because including them trigger unnecessary renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, createAccount, setValue]);

  return (
    <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
      <Title className="pb-30" variant="h6">
        <Trans>Payment info</Trans>
      </Title>
      {paymentMethods && paymentMethods.length > 0 ? (
        <>
          {paymentMethods.map(paymentMethod => (
            <div className="mb-20" key={paymentMethod.id}>
              <Radio
                label={_(
                  msg`Use my credit card on file ending in ${paymentMethod.card?.last4}`,
                )}
                value={paymentMethod.id}
                selectedValue={paymentMethodId}
                {...register(`paymentMethodId`)}
              />
            </div>
          ))}
          <Radio
            label={_(msg`Enter a new credit card`)}
            value={''}
            selectedValue={paymentMethodId}
            {...register(`paymentMethodId`)}
          >
            {paymentMethodId === '' && (
              <CardInfo
                className="mt-20"
                accountId={accountId}
                setPaymentInfoValid={setPaymentInfoValid}
              />
            )}
          </Radio>
        </>
      ) : (
        <CardInfo
          accountId={accountId}
          setPaymentInfoValid={setPaymentInfoValid}
        />
      )}
    </Card>
  );
};
