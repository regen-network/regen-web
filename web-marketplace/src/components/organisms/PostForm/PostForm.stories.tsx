import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { PostForm } from './PostForm';
import { initialValues, projectLocation } from './PostForm.mocks';

export default {
  title: 'forms/PostForm',
  component: PostForm,
} as Meta<typeof PostForm>;

type Story = StoryObj<typeof PostForm>;
export const Basic: Story = {
  render: args => <PostForm className="mx-auto" {...args} />,
};

Basic.args = {
  onClose: action('onClose'),
  onSubmit: action('onClose'),
  projectLocation,
  initialValues,
};
