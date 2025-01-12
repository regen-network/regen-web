import { Meta, StoryObj } from '@storybook/react';

import { PostFiles } from './PostFiles';
import { files } from './PostFiles.mock';

export default {
  title: 'organisms/PostFiles',
  component: PostFiles,
} as Meta<typeof PostFiles>;

type Story = StoryObj<typeof PostFiles>;

const readMoreText = { text: 'read', lessText: 'less', moreText: 'more' };

export const Public: Story = {
  render: args => <PostFiles {...args} />,
};

Public.args = {
  privacyType: 'public',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files,
  photoCredit: 'Photo credit',
  readMoreText,
};

export const PrivateLocations: Story = {
  render: args => <PostFiles {...args} />,
};

PrivateLocations.args = {
  privacyType: 'private_locations',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files: [],
  readMoreText,
};

export const PrivateFiles: Story = {
  render: args => <PostFiles {...args} />,
};

PrivateFiles.args = {
  privacyType: 'private_files',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files: [],
  readMoreText,
};

export const PrivateLocationsAsAdmin: Story = {
  render: args => <PostFiles {...args} />,
};

PrivateLocationsAsAdmin.args = {
  privacyType: 'private_locations',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files: [],
  isAdmin: true,
  readMoreText,
};

export const PrivateFilesAsAdmin: Story = {
  render: args => <PostFiles {...args} />,
};

PrivateFilesAsAdmin.args = {
  privacyType: 'private_files',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files: [],
  isAdmin: true,
  readMoreText,
};
