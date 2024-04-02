import React from 'react';
import { StoryObj } from '@storybook/react';

import PostCard from './PostCard';
import {
  DeleteMenuItem,
  EditMenuItem,
  SharePrivateMenuItem,
  SharePublicMenuItem,
} from './PostCard.MenuItems';
import { commonArgs, signer } from './PostCard.mock';

type Story = StoryObj<typeof PostCard>;

export default {
  title: 'Cards/PostCard',
  component: PostCard,
};

export const Public: Story = {
  args: {
    ...commonArgs,
    imgSrc: '/coorong.png',
    isPrivate: false,
    isAdmin: false,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    handleClickFile: { action: 'handle file click' },
  },
  render: args => <PostCard {...args} signer={signer} />,
};

export const Private: Story = {
  args: {
    ...commonArgs,
    isPrivate: true,
    numberOfFiles: 5,
    imgSrc: '/coorong.png',
    isAdmin: true,
    adminMenuItems: [
      <EditMenuItem />,
      <SharePublicMenuItem />,
      <SharePrivateMenuItem />,
      <DeleteMenuItem />,
    ],
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    handleClickFile: { action: 'handle file click' },
  },
  render: args => <PostCard {...args} signer={signer} />,
};

export const NoImage: Story = {
  args: {
    ...commonArgs,
    isPrivate: true,
    numberOfFiles: 5,
    isAdmin: false,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    handleClickFile: { action: 'handle file click' },
  },
  render: args => <PostCard {...args} signer={signer} />,
};
