import { Meta, StoryObj } from '@storybook/react';

import { CurrencyFlag } from './CurrencyFlag';

export default {
  title: 'CurrencyFlag',
  component: CurrencyFlag,
} as Meta<typeof CurrencyFlag>;

type Story = StoryObj<typeof CurrencyFlag>;

export const USD: Story = {
  render: args => <CurrencyFlag currency="USD" />,
};
