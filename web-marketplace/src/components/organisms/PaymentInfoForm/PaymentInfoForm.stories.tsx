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
};

export const FiatLoggedIn: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

FiatLoggedIn.args = {
  paymentOption: 'card',
  accountEmail: 'john@doe.com',
  accountName: 'John Doe',
  login: action('login'),
};

export const CryptoNoEmail: Story = {
  render: args => <PaymentInfoForm {...args} />,
};

CryptoNoEmail.args = {
  paymentOption: 'crypto',
  wallet: { address: 'regen123456', shortAddress: 'regen123' },
  login: action('login'),
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
};
