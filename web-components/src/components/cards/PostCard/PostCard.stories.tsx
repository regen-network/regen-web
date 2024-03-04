import React from 'react';
import { MenuItem } from '@mui/material';
import { StoryObj } from '@storybook/react';

import PostCard from './PostCard';
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

const adminMenuItems = [
  <MenuItem key="1">Menu Item 1</MenuItem>,
  <MenuItem key="2">Menu Item 2</MenuItem>,
  <MenuItem key="3">Menu Item 3</MenuItem>,
];

export const Private: Story = {
  args: {
    ...commonArgs,
    isPrivate: true,
    numberOfFiles: 5,
    imgSrc: '/coorong.png',
    isAdmin: true,
    adminMenuItems,
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
    isAdmin: true,
    adminMenuItems,
  },
  argTypes: {
    handleClickShare: { action: 'handle share click' },
    handleClickFile: { action: 'handle file click' },
  },
  render: args => <PostCard {...args} signer={signer} />,
}
