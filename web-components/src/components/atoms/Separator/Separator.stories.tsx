import { StoryObj } from '@storybook/react';

import { Separator } from './Separator';

type Story = StoryObj<typeof Separator>;

export default {
  title: 'atoms/Separator',
  component: Separator,
};

export const Default: Story = {
  args: {
    className: 'mx-50',
  },
  render: args => <Separator {...args} />,
};

