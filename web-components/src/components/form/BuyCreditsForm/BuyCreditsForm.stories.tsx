import { Meta, StoryObj } from '@storybook/react';

import {
  creditVintages,
  cryptoOptions,
} from '../../inputs/new/CreditsAmount/CreditsAmount.mock';
import { BuyCreditsForm } from './BuyCreditsForm';

export default {
  title: 'Forms/BuyCreditsForm',
  component: BuyCreditsForm,
} as Meta<typeof BuyCreditsForm>;

type Story = StoryObj<typeof BuyCreditsForm>;

export const BuyCreditsStep1: Story = {
  render: args => <BuyCreditsForm {...args} />,
};

BuyCreditsStep1.args = {
  cryptoOptions,
  creditVintages,
};
