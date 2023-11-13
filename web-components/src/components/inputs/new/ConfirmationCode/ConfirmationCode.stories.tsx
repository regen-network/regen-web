/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';

import { ConfirmationCode } from './ConfirmationCode';

export default {
  title: 'Inputs/ConfirmationCode',
  component: ConfirmationCode,
} as Meta<typeof ConfirmationCode>;

type Story = StoryObj<typeof ConfirmationCode>;

export const Basic: Story = {
  render: args => {
    return <ConfirmationCode {...args} />;
  },
};
