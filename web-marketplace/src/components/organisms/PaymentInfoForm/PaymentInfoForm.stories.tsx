import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import { PaymentInfoForm, PaymentInfoFormProps } from './PaymentInfoForm';
import { defaultStripeOptions } from './PaymentInfoForm.constants';

export default {
  title: 'Marketplace/Organisms/PaymentInfoForm',
  component: PaymentInfoForm,
} as Meta<typeof PaymentInfoForm>;

type Story = StoryObj<typeof PaymentInfoForm>;

const stripeKey = import.meta.env.STORYBOOK_STRIPE_PUBLISHABLE_KEY;

const WrappedPaymentInfoForm = (args: PaymentInfoFormProps) => {
  const options = { amount: 1000, currency: 'usd', ...defaultStripeOptions };
  const stripePromise =
    args.paymentOption === PAYMENT_OPTIONS.CARD &&
    stripeKey &&
    loadStripe(stripeKey);

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentInfoForm {...args} />
    </Elements>
  );
};
export const FiatLoggedOut: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

FiatLoggedOut.args = {
  paymentOption: 'card',
  login: action('login'),
  retiring: true,
};

export const FiatLoggedInNoEmail: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

FiatLoggedInNoEmail.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountName: 'John Doe',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
  retiring: true,
};

export const FiatLoggedInWithEmail: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

FiatLoggedInWithEmail.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  retiring: true,
};

export const FiatLoggedInWithPaymentMethod: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

FiatLoggedInWithPaymentMethod.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  retiring: true,
  paymentMethods: [
    {
      id: 'pm_1PazO7B79fEloexmWKaoomoY',
      object: 'payment_method',
      billing_details: {
        address: {
          city: null,
          country: 'FR',
          line1: null,
          line2: null,
          postal_code: null,
          state: null,
        },
        email: null,
        name: null,
        phone: null,
      },
      card: {
        brand: 'visa',
        checks: {
          address_line1_check: null,
          address_postal_code_check: null,
          cvc_check: 'pass',
        },
        country: 'US',
        exp_month: 2,
        exp_year: 2026,
        fingerprint: 's7WT4PQ6SDYGr9R2',
        funding: 'credit',
        last4: '4242',
        three_d_secure_usage: { supported: true },
        wallet: null,
      },
      created: 1720613567,
      customer: 'cus_QRt59xtRFmtqpR',
      livemode: false,
      metadata: {},
      type: 'card',
    },
  ],
};

export const CryptoNoEmail: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

CryptoNoEmail.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
  retiring: true,
};

export const CryptoTradableCredits: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

CryptoTradableCredits.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
  retiring: false,
};

export const CryptoWithEmail: Story = {
  render: args => <WrappedPaymentInfoForm {...args} />,
};

CryptoWithEmail.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  retiring: true,
};
