import { Meta, StoryObj } from '@storybook/react';

import { PrefinanceTag } from './PrefinanceTag';

export default {
  title: 'PrefinanceTag',
  component: PrefinanceTag,
} as Meta<typeof PrefinanceTag>;

type Story = StoryObj<typeof PrefinanceTag>;

export const Default: Story = {
  render: args => <PrefinanceTag {...args} />,
};

Default.args = {
  classNames: {
    root: '',
    label: '',
  },
  bodyTexts: { prefinance: 'prefinance' },
};
