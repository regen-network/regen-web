import { Meta, StoryObj } from '@storybook/react';
import {
  creditVintages,
  cryptoOptions,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { ChooseCreditsForm } from './ChooseCreditsForm';

export default {
  title: 'organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

export const ChooseCreditsStep1: Story = {
  render: args => <ChooseCreditsForm {...args} />,
};

ChooseCreditsStep1.args = {
  cryptoOptions,
  creditVintages,
};
