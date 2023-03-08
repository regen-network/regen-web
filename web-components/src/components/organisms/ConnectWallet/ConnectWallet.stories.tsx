import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import OutlinedButton from 'src/components/buttons/OutlinedButton';

import { ConnectWallet } from './ConnectWallet';

export default {
  title: 'organisms/ConnectWallet',
  component: ConnectWallet,
} as ComponentMeta<typeof ConnectWallet>;

const Template: ComponentStory<typeof ConnectWallet> = args => (
  <Box sx={{ width: '100%', mt: 17 }}>
    <ConnectWallet
      {...args}
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
          size="large"
        >
          connect wallet
        </OutlinedButton>
      }
    />
  </Box>
);

export const Page = Template.bind({});
Page.args = {
  title: 'You must connect to Keplr in order to view the content of this page.',
  variant: 'page',
};

export const Modal = Template.bind({});
Modal.args = {
  title: 'You must connect to Keplr in order to view the content of this page.',
  description: 'Learn how to set up a Keplr wallet →',
  variant: 'modal',
};
