/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { KeplrWalletConnectModal } from './KeplrWalletConnectModal';

export default {
  title: 'Modal/KeplrWalletConnectModal',
  component: KeplrWalletConnectModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof KeplrWalletConnectModal>;

type Story = StoryObj<typeof KeplrWalletConnectModal>;

export const Basic: Story = {
  args: {
    helpLink: {
      href: '#',
      text: 'set up a Keplr wallet →',
    },
    button: {
      text: 'connect wallet',
      onClick: action('connect wallet'),
      startIcon: (
        <Box
          component="img"
          src={'/wallets/keplr-wallet-extension.png'}
          alt="keplr"
          sx={{ width: 21, mr: 2 }}
        />
      ),
    },
    title:
      'You must connect a Keplr wallet address to your existing account in order to view this content.',
    subtitle:
      'Blockchain-based actions such as buying are only possible with a wallet address. Please set up a Keplr wallet in order to continue. ',
    learnMoreText: 'Learn how to ',
  },
  render: args => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
      setOpen(false);
    };

    return <KeplrWalletConnectModal {...args} onClose={onClose} open={open} />;
  },
};
