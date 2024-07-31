import { Meta, StoryObj } from '@storybook/react';

import { AgreePurchaseForm } from './AgreePurchaseForm';

export default {
  title: 'Marketplace/Organisms/AgreePurchaseForm',
  component: AgreePurchaseForm,
} as Meta<typeof AgreePurchaseForm>;

type Story = StoryObj<typeof AgreePurchaseForm>;

export const Retirement: Story = {
  render: args => <AgreePurchaseForm {...args} />,
};

Retirement.args = {
  retiring: true,
  country: 'US',
};

export const NoRetirement: Story = {
  render: args => <AgreePurchaseForm {...args} />,
};

NoRetirement.args = {
  retiring: false,
};
