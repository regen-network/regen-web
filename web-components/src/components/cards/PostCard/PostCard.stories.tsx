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
    sharePublicLink: { action: 'share public click' },
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
    sharePublicLink: { action: 'share public click' },
    sharePrivateLink: { action: 'share private link' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const NoImage: Story = {
  args: {
    ...commonArgs,
    privacyLabel: 'Files are private',
    isAdmin: false,
  },
  argTypes: {
    sharePublicLink: { action: 'share public click' },
    sharePrivateLink: { action: 'share private link' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const Draft: Story = {
  args: {
    ...commonArgs,
    isAdmin: true,
    draftLabel: 'Draft',
  },
  argTypes: {
    sharePublicLink: { action: 'share public click' },
    sharePrivateLink: { action: 'share private link' },
    onEditDraft: { action: 'edit draft' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};

export const DraftPrivate: Story = {
  args: {
    ...commonArgs,
    privacyLabel: 'Post is private',
    numberOfFiles: 5,
    isAdmin: true,
    draftLabel: 'Draft',
    file,
  },
  argTypes: {
    sharePublicLink: { action: 'share public click' },
    sharePrivateLink: { action: 'share private link' },
    onEditDraft: { action: 'edit draft' },
  },
  render: args => <PostCard {...args} signers={signers} />,
};
