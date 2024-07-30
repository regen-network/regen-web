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
