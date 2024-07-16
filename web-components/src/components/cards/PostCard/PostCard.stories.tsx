import { StoryObj } from '@storybook/react';

import PostCard from './PostCard';
import { commonArgs, file, signers } from './PostCard.mock';

type Story = StoryObj<typeof PostCard>;

export default {
  title: 'Cards/PostCard',
  component: PostCard,
};

export const Public: Story = {
  args: {
    ...commonArgs,
    file,
    isAdmin: false,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    sharePrivateLink: { action: 'share private link' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const Private: Story = {
  args: {
    ...commonArgs,
    privacyLabel: 'Post is private',
    numberOfFiles: 5,
    file,
    isAdmin: true,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    sharePrivateLink: { action: 'share private link' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const NoImage: Story = {
  args: {
    ...commonArgs,
    privacyLabel: 'Files are private',
    numberOfFiles: 5,
    isAdmin: false,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    sharePrivateLink: { action: 'share private link' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};
