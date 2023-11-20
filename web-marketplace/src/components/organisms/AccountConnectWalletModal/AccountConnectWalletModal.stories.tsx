import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AccountConnectWalletModal, Props } from './AccountConnectWalletModal';
import { getWalletsMock, uriMock } from './AccountConnectWalletModal.mock';
import { AccountConnectModalState } from './AccountConnectWalletModal.types';

const meta: Meta<typeof AccountConnectWalletModal> = {
  title: 'Registry/Organisms/AccountConnectWalletModal',
  component: AccountConnectWalletModal,
};
export default meta;

type Story = StoryObj<typeof AccountConnectWalletModal>;

export const Default: Story = {
  render: args => <Template {...args} />,
};

const Template = (args: Props) => {
  const [open, setOpen] = useState(true);
  const [modalState, setModalState] = useState<AccountConnectModalState>();
  const onClose = () => {
    setOpen(false);
    setModalState('select');
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const walletsConfig = getWalletsMock({
    onWalletConnectClick: () => setModalState('wallet-mobile'),
  });
  return (
    <AccountConnectWalletModal
      {...args}
      wallets={walletsConfig}
      state={modalState}
      open={open}
      onClose={onClose}
    />
  );
};

Default.args = {
  onClose: () => undefined,
  qrCodeUri: uriMock,
  connecting: false,
};
