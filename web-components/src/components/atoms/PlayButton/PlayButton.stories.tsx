import { Meta, StoryObj } from '@storybook/react';

import { PlayButton } from './PlayButton';

export default {
  title: 'atoms/PlayButton',
  component: PlayButton,
} as Meta<typeof PlayButton>;

type Story = StoryObj<typeof PlayButton>;
export const Basic: Story = {
  render: args => <PlayButton {...args} />,
};

Basic.args = {};
