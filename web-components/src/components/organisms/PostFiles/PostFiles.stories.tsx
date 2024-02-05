import { Meta, StoryObj } from '@storybook/react';

import { PostFiles } from './PostFiles';
import { files } from './PostFiles.mock';

export default {
  title: 'organisms/PostFiles',
  component: PostFiles,
} as Meta<typeof PostFiles>;

type Story = StoryObj<typeof PostFiles>;

export const Public: Story = {
  render: args => (
    <div className="w-[100%] h-[550px]">
      <PostFiles {...args} />
    </div>
  ),
};

Public.args = {
  privacyType: 'public',
  mapboxToken: import.meta.env.STORYBOOK_MAPBOX_TOKEN,
  files,
};
