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
};
