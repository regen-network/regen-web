import { StoryObj } from '@storybook/react';

import PostCard from './PostCard';
import { commonArgs, signers } from './PostCard.mock';

type Story = StoryObj<typeof PostCard>;

export default {
  title: 'Cards/PostCard',
  component: PostCard,
};

export const Public: Story = {
  args: {
    ...commonArgs,
    imgSrc: '/coorong.png',
    isAdmin: false,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const Private: Story = {
  args: {
    ...commonArgs,
    privacyLabel: 'Post is private',
    numberOfFiles: 5,
    imgSrc: '/coorong.png',
    isAdmin: true,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
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
  },
  render: args => <PostCard {...args} signers={signers} />,
};
