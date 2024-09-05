import { Meta, StoryObj } from '@storybook/react';

import { PauseButton } from './PauseButton';

export default {
  title: 'atoms/PauseButton',
  component: PauseButton,
} as Meta<typeof PauseButton>;

type Story = StoryObj<typeof PauseButton>;
export const Basic: Story = {
  render: args => <PauseButton {...args} />,
};

Basic.args = {};
