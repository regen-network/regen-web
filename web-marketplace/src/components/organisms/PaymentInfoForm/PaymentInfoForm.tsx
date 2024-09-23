import { useEffect, useMemo, useState } from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { Stripe, StripeElements } from '@stripe/stripe-js';

import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { NEXT, PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import {
  CustomerInfo,
  CustomerInfoProps,
} from './PaymentInfoForm.CustomerInfo';
import { PaymentInfo, PaymentInfoProps } from './PaymentInfoForm.PaymentInfo';
import {
  paymentInfoFormSchema,
  PaymentInfoFormSchemaType,
} from './PaymentInfoForm.schema';

export type PaymentInfoFormProps = {
  paymentOption: PaymentOptionsType;
  onSubmit: (values: PaymentInfoFormSchemaType) => Promise<void>;
  setError: (error: string) => void;
  setConfirmationTokenId: UseStateSetter<string | undefined>;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  initialValues?: DefaultValues<PaymentInfoFormSchemaType>;
} & CustomerInfoProps &
  PaymentInfoProps;

export const PaymentInfoForm = ({
  paymentOption,
  wallet,
  accountEmail,
  accountName,
  accountId,
  onSubmit,
  login,
  paymentMethods,
  setError,
  retiring,
  setConfirmationTokenId,
  stripe,
  elements,
  initialValues,
}: PaymentInfoFormProps) => {
  const { _ } = useLingui();
  const { handleBack } = useMultiStep();
  const [paymentInfoValid, setPaymentInfoValid] = useState(false);

  const form = useZodForm({
    schema: paymentInfoFormSchema(paymentOption, wallet),
    defaultValues: {
      email: initialValues?.email || accountEmail,
      name: initialValues?.name || accountName,
      createAccount: initialValues?.createAccount || true,
      savePaymentMethod: initialValues?.savePaymentMethod || true,
      paymentMethodId: paymentMethods?.[0]?.id,
    },
    mode: 'onBlur',
  });
  const { isValid, isSubmitting } = useFormState({
    control: form.control,
  });

  useEffect(() => {
    // set form values after login
    if (accountEmail) form.setValue('email', accountEmail);
    if (accountName) form.setValue('name', accountName);
    if (paymentMethods)
      form.setValue('paymentMethodId', paymentMethods?.[0]?.id);
  }, [accountEmail, accountName, form, paymentMethods]);

  const paymentMethodId = useWatch({
    control: form.control,
    name: 'paymentMethodId',
  });
  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
  );
  return (
    <Form
      form={form}
      onSubmit={async (values: PaymentInfoFormSchemaType) => {
        const card = paymentOption === PAYMENT_OPTIONS.CARD;
        if (card && !stripe) {
          return;
        }
        if (card && stripe && elements && !values.paymentMethodId) {
          const submitRes = await elements?.submit();
          if (submitRes?.error?.message) {
            setError(submitRes?.error?.message);
            return;
          }
          // Create the ConfirmationToken using the details collected by the Payment Element
          const { error, confirmationToken } =
            await stripe.createConfirmationToken({
              elements,
              params: {
                payment_method_data: {
                  billing_details: {
                    name: values.name,
                    email: values.email,
                  },
                },
              },
            });
          if (error?.message) {
            setError(error?.message);
            return;
          }
          setConfirmationTokenId(confirmationToken?.id);
        }
        onSubmit(values);
      }}
    >
      <div className="flex flex-col gap-10 sm:gap-20 max-w-[560px]">
        <CustomerInfo
          paymentOption={paymentOption}
          wallet={wallet}
          login={login}
          accountEmail={accountEmail}
          accountId={accountId}
          accountName={accountName}
          retiring={retiring}
        />
        {card && (
          <PaymentInfo
            paymentMethods={paymentMethods}
            accountId={accountId}
            setPaymentInfoValid={setPaymentInfoValid}
          />
        )}
      </div>
      <div className="float-right pt-40">
        <PrevNextButtons
          saveDisabled={
            !isValid ||
            isSubmitting ||
            (!stripe && card) ||
            (card && !paymentMethodId && !paymentInfoValid)
          }
          saveText={_(NEXT)}
          onPrev={handleBack}
        />
      </div>
    </Form>
  );
};
