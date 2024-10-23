import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { EditableInput } from './EditableInput';

export default {
  title: 'Inputs/EditableInput',
  component: EditableInput,
} as Meta<typeof EditableInput>;

type Story = StoryObj<typeof EditableInput>;

export const Default: Story = {
  render: args => <EditableInput {...args} />,
};

Default.args = {
  value: 5,
  maxValue: 10,
  onChange: action('onChange'),
};
