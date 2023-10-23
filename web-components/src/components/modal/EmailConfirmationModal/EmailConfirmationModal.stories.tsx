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
    resendText: 'Don’t see anything?',
    resendButtonLink: { text: 'Resend email', onClick: action('resend') },
    mailLink: { text: 'joemcnab@gmail.com', href: '' },
    error: '',
  },
  render: args => {
    const [open, setOpen] = useState(true);
    const [, setResult] = useState<undefined | string>();
    const [error, setError] = useState<undefined | string>();

    const handleOnChange = (code: string) => {
      setResult(code);
      if (code.length === 6) {
        setError('Incorrect code! Double-check the code and try again.');
      } else {
        setError(undefined);
      }
    };

    const onClose = () => {
      setOpen(false);
    };

    return (
      <EmailConfirmationModal
        {...args}
        onClose={onClose}
        open={open}
        error={error ?? args.error}
        onCodeChange={handleOnChange}
      />
    );
  },
};
