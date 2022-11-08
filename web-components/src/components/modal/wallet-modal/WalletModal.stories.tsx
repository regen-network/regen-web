import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WalletModal } from './WalletModal';
import { getWalletsMock, uriMock } from './WalletModal.mock';
import { WalletModalState } from './WalletModal.types';

export default {
  title: 'Modal/WalletModal',
  component: WalletModal,
} as ComponentMeta<typeof WalletModal>;

const Template: ComponentStory<typeof WalletModal> = args => {
  const [open, setOpen] = useState(true);
  const [modalState, setModalState] = useState<WalletModalState>();
  const onClose = () => {
    setOpen(false);
    setModalState('wallet-select');
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const walletsConfig = getWalletsMock({
    onWalletConnectClick: () => setModalState('wallet-mobile'),
  });
  return (
    <WalletModal
      {...args}
      wallets={walletsConfig}
      state={modalState}
      open={open}
      onClose={onClose}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  onClose: () => undefined,
  qrCodeUri: uriMock,
  mobileConnectUrl: '#',
};

Default.argTypes = {};
