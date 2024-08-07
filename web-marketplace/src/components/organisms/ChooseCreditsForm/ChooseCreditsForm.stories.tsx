import { Meta, StoryObj } from '@storybook/react';
import { creditVintages } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { ChooseCreditsForm } from './ChooseCreditsForm';

export default {
  title: 'Marketplace/organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

export const ChooseCreditsStep1: Story = {
  render: args => <ChooseCreditsForm {...args} />,
};

ChooseCreditsStep1.args = {
  creditVintages,
};
