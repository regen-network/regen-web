import { Meta, StoryObj } from '@storybook/react';
import {
  creditDetails,
  creditVintages,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { ChooseCreditsForm } from './ChooseCreditsForm';

export default {
  title: 'Marketplace/Organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

export const ChooseCredits: Story = {
  render: args => <ChooseCreditsForm {...args} />,
};

ChooseCredits.args = {
  creditVintages,
  creditDetails,
};
