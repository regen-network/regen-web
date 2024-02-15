import React from 'react';
import { MenuItem } from '@mui/material';
import { StoryObj } from '@storybook/react';

import { User } from 'src/components/user/UserInfo';

import { Body } from '../../typography';
import PostCard from './PostCard';

type Story = StoryObj<typeof PostCard>;

export default {
  title: 'Cards/PostCard 2',
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
  // TODO: fix hacky negative margin
  nameRaw: <Body sx={{}}>Odonata</Body>,
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
};

export const Public2: Story = {
  args: {
    title: 'Fall 2023 Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgSrc: '../impactag-smallmap-top-v2.jpg',
    author: user,
    authorRole: 'admin',
    timestamp: '2022-01-31T12:34:56Z',
    // signer: signer,
    isPrivate: false,
  },
  render: args => <PostCard {...args} signer={signer} />,
};

const adminMenuItems = (
  <React.Fragment>
    <MenuItem>Hello</MenuItem>
    <MenuItem>Hello</MenuItem>
    <MenuItem>Hello</MenuItem>
  </React.Fragment>
);

export const Private: Story = {
  args: {
    title: 'Fall 2023 Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgSrc: '../impactag-smallmap-top-v2.jpg',
    author: user,
    authorRole: 'admin',
    timestamp: '2022-01-31T12:34:56Z',
    // signer: signer,
    isPrivate: true,
    numberOfFiles: 5,
    isAdmin: true,
    adminMenuItems: adminMenuItems,
  },
  // argTypes: {
  //   isAdmin: {
  //     options: [true, false],
  //     control: { type: 'boolean' },
  //   },
  // },
  render: args => <PostCard {...args} signer={signer} />,
};
