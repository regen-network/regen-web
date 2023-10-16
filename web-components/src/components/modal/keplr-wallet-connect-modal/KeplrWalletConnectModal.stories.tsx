import { useState } from 'react';
import { Box, Link } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import OutlinedButton from '../../../components/buttons/OutlinedButton';
import { Body } from '../../../components/typography';
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
  render: args => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
      setOpen(false);
    };

    return (
      <KeplrWalletConnectModal
        {...args}
        onClose={onClose}
        open={open}
        helpLink={
          <Body sx={{ mt: 2 }}>
            {'Learn how to '}
            <Link>{'set up a Keplr wallet →'}</Link>
          </Body>
        }
        button={
          <OutlinedButton
            startIcon={
              <Box
                component="img"
                src={'/wallets/keplr-wallet-extension.png'}
                alt="keplr"
                sx={{ width: 21, mr: 2 }}
              />
            }
            sx={{ mt: 12.5 }}
            size="large"
          >
            connect wallet
          </OutlinedButton>
        }
      />
    );
  },
};
