import { Meta, StoryObj } from '@storybook/react';

import { EditFileForm } from './EditFileForm';

export default {
  title: 'forms/EditFileForm',
  component: EditFileForm,
} as Meta<typeof EditFileForm>;

type Story = StoryObj<typeof EditFileForm>;

export const Basic: Story = {
  render: args => <EditFileForm className="mx-auto" {...args} />,
};

Basic.args = {};
