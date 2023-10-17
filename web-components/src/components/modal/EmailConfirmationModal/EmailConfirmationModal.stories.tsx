/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Link } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { EmailConfirmationModal } from './EmailConfirmationModal';

export default {
  title: 'Modal/EmailConfirmationModal',
  component: EmailConfirmationModal,
  args: {
    cancelButton: {
      text: 'cancel',
      onClick: action('cancel'),
    },
    signInButton: {
      text: 'sign in',
      onClick: action('sign in'),
    },
  },
  argTypes: {
    onClose: { action: 'clicked' },
  },
} as Meta<typeof EmailConfirmationModal>;

type Story = StoryObj<typeof EmailConfirmationModal>;

export const Basic: Story = {
  args: {
    resendTimer: 59,
  },
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
