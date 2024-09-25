import { Meta, StoryObj } from '@storybook/react';

import { TebuBanner } from './TebuBanner';
import { tebuBannerMock } from './TebuBanner.mock';

export default {
  title: 'Marketplace/Molecules/TebuBanner',
  component: TebuBanner,
} as Meta<typeof TebuBanner>;

type Story = StoryObj<typeof TebuBanner>;

export const Basic: Story = {
  render: args => (
    <div className="max-w-[1000px] p-10">
      <TebuBanner {...args} />
    </div>
  ),
};

Basic.args = {
  ...tebuBannerMock,
};
