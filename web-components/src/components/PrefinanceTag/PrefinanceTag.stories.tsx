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
  wrapperClassName:
    'bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 sm:py-10 py-[3px] text-grey-0 absolute top-30 sm:top-50 left-0',
  labelClassname: 'sm:text-[11px] pl-10 font-extrabold uppercase',
};
