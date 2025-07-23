import { Meta, StoryObj } from '@storybook/react';

import { MemberCard } from './MemberCard';
import { member } from './MemberCard.mock';

export default {
  title: 'Marketplace/Molecules/MemberCard',
  component: MemberCard,
} as Meta<typeof MemberCard>;

type Story = StoryObj<typeof MemberCard>;

export const Default: Story = {
  render: args => (
    <div className="max-w-[270px]">
      <MemberCard {...args} />
    </div>
  ),
};

Default.args = {
  ...member,
  isCurrentAccount: false,
};

export const AsCurrentAccount: Story = {
  render: args => (
    <div className="max-w-[270px]">
      <MemberCard {...args} />
    </div>
  ),
};

AsCurrentAccount.args = {
  ...member,
  isCurrentAccount: true,
};
