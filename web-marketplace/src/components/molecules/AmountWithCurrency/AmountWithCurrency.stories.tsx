import { Meta, StoryObj } from '@storybook/react';

import { AmountWithCurrency } from './AmountWithCurrency';

export default {
  title: 'Marketplace/Molecules/AmountWithCurrency',
  component: AmountWithCurrency,
} as Meta<typeof AmountWithCurrency>;

type Story = StoryObj<typeof AmountWithCurrency>;

export const Default: Story = {
  render: args => <AmountWithCurrency {...args} />,
};

Default.args = {
  amount: 123,
  currency: {
    askBaseDenom: 'uregen',
    askDenom: 'uregen',
  },
  displayDenom: 'REGEN',
  classes: {
    denom: 'pt-[8px] text-base',
  },
};
