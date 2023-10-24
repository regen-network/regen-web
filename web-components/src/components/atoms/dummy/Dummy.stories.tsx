import { Meta, StoryObj } from '@storybook/react';

import { Dummy } from './Dummy';

export default {
  title: 'atoms/Dummy',
  component: Dummy,
} as Meta<typeof Dummy>;

type Story = StoryObj<typeof Dummy>;

export const Basic: Story = { render: args => <Dummy {...args} /> };

Basic.args = {
  label: 'Dummy',
};
