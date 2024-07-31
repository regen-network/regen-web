import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptionsMode } from '@stripe/stripe-js';

import { defaultFontFamily } from 'web-components/src/theme/muiTheme';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  CustomerInfo,
  CustomerInfoProps,
} from './PaymentInfoForm.CustomerInfo';
import { PaymentInfo, PaymentInfoProps } from './PaymentInfoForm.PaymentInfo';
import {
  paymentInfoFormSchema,
  PaymentInfoFormSchemaType,
} from './PaymentInfoForm.schema';
import { PaymentOptionsType } from './PaymentInfoForm.types';

type PaymentInfoFormProps = {
  paymentOption: PaymentOptionsType;
  onSubmit: (values: PaymentInfoFormSchemaType) => Promise<void>;
  stripePublishableKey?: string;
  amount: number;
  currency: string;
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
  stripePublishableKey,
  amount,
  currency,
  retiring,
}: PaymentInfoFormProps) => {
  const form = useZodForm({
    schema: paymentInfoFormSchema(paymentOption),
    defaultValues: {
      email: accountEmail,
      name: accountName,
      createAccount: true,
      savePaymentMethod: true,
      paymentMethodId: paymentMethods?.[0]?.id,
    },
    mode: 'onBlur',
  });

  const stripePromise =
    paymentOption === 'card' &&
    stripePublishableKey &&
    loadStripe(stripePublishableKey);

  const options: StripeElementsOptionsMode = {
    mode: 'payment',
    amount,
    currency,
    paymentMethodCreation: 'manual',
    fonts: [
      {
        cssSrc:
          'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,800',
      },
    ],
    appearance: {
      theme: 'stripe',
      variables: {
        colorText: '#000',
        colorDanger: '#DE4526',
        fontFamily: defaultFontFamily,
        spacingUnit: '5px',
        borderRadius: '2px',
      },
      rules: {
        '.Label': {
          fontWeight: 'bold',
          fontSize: '16px',
        },
        '.Input': {
          boxShadow: 'none',
          borderColor: '#D2D5D9',
          marginTop: '9px',
        },
      },
    },
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
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
        {paymentOption === 'card' && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentInfo
              paymentMethods={paymentMethods}
              accountId={accountId}
            />
          </Elements>
        )}
      </div>
    </Form>
  );
};
