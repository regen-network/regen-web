import { useState } from 'react';
import { Link } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import { EmailConfirmationModal } from './EmailConfirmationModal';

export default {
  title: 'Modal/EmailConfirmationModal',
  component: EmailConfirmationModal,
} as Meta<typeof EmailConfirmationModal>;

type Story = StoryObj<typeof EmailConfirmationModal>;

export const Basic: Story = {
  render: args => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
      setOpen(false);
    };

    return (
      <EmailConfirmationModal
        {...args}
        onClose={onClose}
        open={open}
        mailLinkChildren={<Link>{'joemcnab@gmail.com'}</Link>}
        resendLinkChildren={<Link>{'Resend email'}</Link>}
      />
    );
  },
};
