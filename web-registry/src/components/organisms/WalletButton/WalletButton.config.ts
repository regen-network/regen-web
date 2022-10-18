import {
  Wallet,
  WalletModalState,
} from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { UseStateSetter } from 'types/react/use-state';

type GetWalletsUiConfigParams = {
  setModalState: UseStateSetter<WalletModalState>;
  connectToWallet: () => Promise<void>;
};

export const getAllWalletsUiConfig = ({
  connectToWallet,
  setModalState,
}: GetWalletsUiConfigParams): Wallet[] => [
  {
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    imageUrl: '/png/wallets/keplr-wallet-extension.png',
    onClick: connectToWallet,
  },
  {
    name: 'WalletConnect',
    description: 'Keplr Mobile',
    imageUrl: '/png/wallets/walletconnect-keplr.png',
    onClick: async () => {
      await connectToWallet();
      setModalState('wallet-mobile');
    },
  },
];
