import React from 'react';
import { MenuItem } from '@mui/material';
import { StoryObj } from '@storybook/react';

import { User } from 'src/components/user/UserInfo';

import { Body } from '../../typography';
import PostCard from './PostCard';

type Story = StoryObj<typeof PostCard>;

export default {
  title: 'Cards/PostCard',
  component: PostCard,
};

const user: User = {
  name: 'Odonata',
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
};

const signer: User = {
  name: 'Odonata',
  nameRaw: <Body>Odonata</Body>,
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
};

export const Public: Story = {
  args: {
    title: 'Fall 2023 Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgSrc: '/coorong.png',
    author: user,
    authorRole: 'admin',
    timestamp: '2022-01-31T12:34:56Z',
    isPrivate: false,
    isAdmin: false,
    handleClickShare: () => {
      console.log('handle share click');
    },
    handleClickFile: () => {
      console.log('handle file click');
    },
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
    title: 'Fall 2023 Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgSrc: '/coorong.png',
    author: user,
    authorRole: 'admin',
    timestamp: '2022-01-31T12:34:56Z',
    isPrivate: true,
    numberOfFiles: 5,
    isAdmin: true,
    adminMenuItems: adminMenuItems,
    handleClickFile: () => {
      console.log('handle file click');
    },
  },
  render: args => <PostCard {...args} signer={signer} />,
};
