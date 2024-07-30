import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { PaymentInfoForm } from './PaymentInfoForm';
// import { files } from './PaymentInfoForm.mock';

export default {
  title: 'organisms/PaymentInfoForm',
  component: PaymentInfoForm,
} as Meta<typeof PaymentInfoForm>;

type Story = StoryObj<typeof PaymentInfoForm>;

export const FiatLoggedOut: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

FiatLoggedOut.args = {
  paymentOption: 'card',
  login: action('login'),
  stripePublishableKey: import.meta.env.STORYBOOK_STRIPE_PUBLISHABLE_KEY,
  amount: 1000,
  currency: 'usd',
};

export const FiatLoggedInNoEmail: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

FiatLoggedInNoEmail.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountName: 'John Doe',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
  stripePublishableKey: import.meta.env.STORYBOOK_STRIPE_PUBLISHABLE_KEY,
  amount: 1000,
  currency: 'usd',
};

export const FiatLoggedInWithEmail: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

FiatLoggedInWithEmail.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  stripePublishableKey: import.meta.env.STORYBOOK_STRIPE_PUBLISHABLE_KEY,
  amount: 1000,
  currency: 'usd',
};

export const FiatLoggedInWithPaymentMethod: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

FiatLoggedInWithPaymentMethod.args = {
  paymentOption: 'card',
  accountId: '60ec0504-4a9b-11ef-84b7-0242ac120002',
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  stripePublishableKey: import.meta.env.STORYBOOK_STRIPE_PUBLISHABLE_KEY,
  amount: 1000,
  currency: 'usd',
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
  render: args => <PaymentInfoForm {...args} />,
};

CryptoNoEmail.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
  amount: 1000,
  currency: 'usd',
};

export const CryptoWithEmail: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

CryptoWithEmail.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
  amount: 1000,
  currency: 'usd',
};
