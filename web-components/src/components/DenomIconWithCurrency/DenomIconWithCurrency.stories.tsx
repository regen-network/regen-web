import { Meta, StoryObj } from '@storybook/react';

import { DenomIconWithCurrency } from './DenomIconWithCurrency';
import { CURRENCIES } from './DenomIconWithCurrency.constants';

export default {
  title: 'DenomIconWithCurrency',
  component: DenomIconWithCurrency,
} as Meta<typeof DenomIconWithCurrency>;

type Story = StoryObj<typeof DenomIconWithCurrency>;

export const IconAndCurrency: Story = {
  render: args => <DenomIconWithCurrency {...args} />,
};

IconAndCurrency.args = {
  currency: CURRENCIES.usd,
};

export const withTooltip: Story = {
  render: args => <DenomIconWithCurrency {...args} />,
};

withTooltip.args = {
  currency: CURRENCIES.uregen,
  tooltipText:
    'Different sellers may sell the same credits at different prices. We automatically choose the lowest priced credits for you. This price is the average price of all the credits in your cart.',
};
