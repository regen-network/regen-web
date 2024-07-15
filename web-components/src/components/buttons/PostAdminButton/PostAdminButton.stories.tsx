import { StoryObj } from '@storybook/react';

import { PostAdminButton } from './PostAdminButton';

type Story = StoryObj<typeof PostAdminButton>;

export default {
  title: 'Buttons/PostAdminButton',
  component: PostAdminButton,
  argTypes: {
    sharePublicLink: { action: 'share public link' },
    sharePrivateLink: { action: 'share private link' },
  },
};

export const Public: Story = {
  args: {
    publicPost: true,
  },
};

export const Private: Story = {
  args: {
    publicPost: false,
  },
};
