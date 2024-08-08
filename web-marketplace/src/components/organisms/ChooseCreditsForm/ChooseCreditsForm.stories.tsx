import { Meta, StoryObj } from '@storybook/react';
import { creditVintages } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { ChooseCreditsForm } from './ChooseCreditsForm';

export default {
  title: 'Marketplace/Organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

const creditAvailability = [
  {
    credits: 1000,
    currency: CURRENCIES.usd,
  },
  {
    credits: 2000,
    currency: CURRENCIES.uregen,
  },
  {
    credits: 3000,
    currency: CURRENCIES.usdc,
  },
  {
    credits: 4000,
    currency: CURRENCIES.usdcaxl,
  },
];

export const ChooseCreditsStep1: Story = {
  render: args => <ChooseCreditsForm {...args} />,
};

ChooseCreditsStep1.args = {
  creditVintages,
  creditsAvailable: creditAvailability,
};
