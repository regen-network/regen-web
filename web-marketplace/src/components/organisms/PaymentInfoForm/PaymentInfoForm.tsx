import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { apiUri } from 'lib/apiUri';
import { connectedEmailErrorModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import {
  cardDetailsMissingAtom,
  resetBuyCreditsFormAtom,
} from 'pages/BuyCredits/BuyCredits.atoms';
import { NEXT, PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import {
  BuyCreditsSchemaTypes,
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { CONNECTED_EMAIL_ERROR } from '../RegistryLayout/RegistryLayout.constants';
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
  setCardDetails: UseStateSetter<CardDetails | undefined>;
} & CustomerInfoProps &
  Omit<PaymentInfoProps, 'setPaymentInfoValid'>;

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
  setCardDetails,
}: PaymentInfoFormProps) => {
  const { _ } = useLingui();
  const { activeAccount, privActiveAccount } = useAuth();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const retryCsrfRequest = useRetryCsrfRequest();

  const {
    handleBack,
    handleSave: updateMultiStepData,
    activeStep,
    data,
    handleResetData: removeMultiStepFormData,
    handleActiveStep,
  } = useMultiStep<BuyCreditsSchemaTypes>();
  const [paymentInfoValid, setPaymentInfoValid] = useState(false);

  const setCardDetailsMissing = useSetAtom(cardDetailsMissingAtom);
  const [shouldResetForm, setShouldResetForm] = useAtom(
    resetBuyCreditsFormAtom,
  );
  const setConnectedEmailErrorModalAtom = useSetAtom(
    connectedEmailErrorModalAtom,
  );
  const [paymentElementKey, setPaymentElementKey] = useState(0);
  const form = useZodForm({
    schema: paymentInfoFormSchema(paymentOption),
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

  // Reset form on log out
  useEffect(() => {
    if (shouldResetForm) {
      setShouldResetForm(false);
      // On form reset, remove multi-step form data,
      // reset Stripe card form and reset the current form fields
      removeMultiStepFormData();
      form.reset({
        email: '',
        name: '',
        createAccount: true,
        savePaymentMethod: true,
        paymentMethodId: '',
      });

      // force Stripe Elements to re-render
      setPaymentElementKey(prev => prev + 1);

      handleActiveStep(0);
    }
  }, [
    shouldResetForm,
    form,
    removeMultiStepFormData,
    accountEmail,
    accountName,
    paymentMethods,
    setShouldResetForm,
    handleActiveStep,
  ]);

  const paymentMethodId = useWatch({
    control: form.control,
    name: 'paymentMethodId',
  });
  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
  );

  const handleOnBlur = () => {
    updateMultiStepData(
      {
        ...data,
        name: form.getValues('name'),
        email: form.getValues('email'),
      },
      activeStep,
    );
  };

  const handleOnSubmit = useCallback(
    async (values: PaymentInfoFormSchemaType) => {
      // If a logged in user with no email address (web3 account) provides one,
      // we send a confirmation email.
      if (
        !!activeAccount &&
        !privActiveAccount?.email &&
        data?.email &&
        token
      ) {
        try {
          const response = await postData({
            url: `${apiUri}/marketplace/v1/auth/email/create-token`,
            data: { email: data?.email },
            token,
            retryCsrfRequest,
          });
          // If the email is already connected to another account, we show a modal
          // with the error message.
          if (response.error === CONNECTED_EMAIL_ERROR) {
            setConnectedEmailErrorModalAtom(atom => {
              atom.open = true;
              atom.email = data?.email!;
            });
            return;
          }
        } catch (e) {
          setError(String(e));
        }
      }

      setCardDetailsMissing(false);
      const card = paymentOption === PAYMENT_OPTIONS.CARD;

      if (card && !stripe) return;

      if (card && stripe && elements && !values.paymentMethodId) {
        const submitRes = await elements.submit();
        if (submitRes?.error?.message) {
          setError(submitRes?.error?.message);
          return;
        }
        if (values.savePaymentMethod)
          elements.update({ setupFutureUsage: 'on_session' });

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

      if (card && paymentMethods?.length && values.paymentMethodId) {
        const paymentMethod = paymentMethods.find(
          method => method.id === values.paymentMethodId,
        );
        if (paymentMethod?.card) {
          setCardDetails({
            last4: paymentMethod.card.last4,
            country: paymentMethod.card.country,
            brand: paymentMethod.card.brand,
          });
        }
      }

      onSubmit(values);
    },
    [
      paymentOption,
      stripe,
      elements,
      setError,
      setConfirmationTokenId,
      paymentMethods,
      setCardDetails,
      activeAccount,
      privActiveAccount,
      data,
      token,
      retryCsrfRequest,
      setConnectedEmailErrorModalAtom,
      onSubmit,
      setCardDetailsMissing,
    ],
  );

  return (
    <Form form={form} onSubmit={handleOnSubmit} onBlur={handleOnBlur}>
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
            key={paymentElementKey}
            paymentMethods={paymentMethods}
            accountId={accountId}
            setPaymentInfoValid={setPaymentInfoValid}
          />
        )}
      </div>
      <PrevNextButtons
        saveDisabled={
          !isValid ||
          isSubmitting ||
          (!stripe && card) ||
          (card && !paymentMethodId && !paymentInfoValid)
        }
        saveText={_(NEXT)}
        onPrev={handleBack}
        className="flex justify-end pt-40 sm:pt-60 mr-20 sm:mr-40 md:mr-0 pb-50 sm:pb-0"
      />
    </Form>
  );
};
