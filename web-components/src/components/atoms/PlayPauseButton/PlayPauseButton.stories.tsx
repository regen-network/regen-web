import { Meta, StoryObj } from '@storybook/react';

import { PlayPauseButton } from './PlayPauseButton';

export default {
  title: 'atoms/PlayPauseButton',
  component: PlayPauseButton,
} as Meta<typeof PlayPauseButton>;

type Story = StoryObj<typeof PlayPauseButton>;

export const Play: Story = {
  render: args => <PlayPauseButton {...args} />,
};

Play.args = {
  playing: false,
};

export const Pause: Story = {
  render: args => <PlayPauseButton {...args} />,
};

Pause.args = {
  playing: true,
};
