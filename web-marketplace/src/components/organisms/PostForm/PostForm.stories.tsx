import { Meta, StoryObj } from '@storybook/react';

import { PostForm } from './PostForm';

export default {
  title: 'forms/PostForm',
  component: PostForm,
} as Meta<typeof PostForm>;

type Story = StoryObj<typeof PostForm>;

export const Basic: Story = {
  render: args => <PostForm className="mx-auto" {...args} />,
};

Basic.args = {};
