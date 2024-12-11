import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { EditableInput } from './EditableInput';

export default {
  title: 'Inputs/EditableInput',
  component: EditableInput,
} as Meta<typeof EditableInput>;

type Story = StoryObj<typeof EditableInput>;

const args = {
  value: '5',
  maxValue: 10,
  onChange: action('onChange'),
  inputAriaLabel: 'Editable credits',
  editButtonAriaLabel: 'Edit',
  updateButtonText: 'update',
  cancelButtonText: 'cancel',
};

export const Editable: Story = {
  render: args => (
    <div style={{ maxWidth: '200px' }}>
      <EditableInput {...args} />
    </div>
  ),
};

Editable.args = {
  ...args,
  isEditable: true,
};

export const NonEditable: Story = {
  render: args => (
    <div style={{ maxWidth: '200px' }}>
      <EditableInput {...args} />
    </div>
  ),
};

NonEditable.args = {
  ...args,
  isEditable: false,
};
