import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { SadBeeModal } from './SadBeeModal';

export default {
  title: 'Modal/SadBeeModal',
  component: SadBeeModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof SadBeeModal>;

type Story = StoryObj<typeof SadBeeModal>;

export const Basic: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(true);
    const onClose = () => {
      setOpen(false);
    };

    return (
      <SadBeeModal onClose={onClose} open={open}>
        modal content
      </SadBeeModal>
    );
  },
};
