import { Meta, StoryObj } from '@storybook/react';

import { SupCurrencyAndAmount } from './SupCurrencyAndAmount';

export default {
  title: 'SupCurrencyAndAmount',
  component: SupCurrencyAndAmount,
} as Meta<typeof SupCurrencyAndAmount>;

type Story = StoryObj<typeof SupCurrencyAndAmount>;

export const Default: Story = {
  render: args => <SupCurrencyAndAmount {...args} />,
};

Default.args = {
  price: 5,
  currencyCode: 'usd',
};
