/* eslint-disable lingui/no-unlocalized-strings */

import { LoginProvider } from '../LoginModal/LoginModal.types';

type GetWalletsMockParams = {
  onWalletConnectClick: () => void;
};

export const getWalletsMock = ({
  onWalletConnectClick,
}: GetWalletsMockParams): LoginProvider[] => [
  {
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    image: {
      src: '/wallets/keplr-wallet-extension.png',
      width: 84,
      height: 84,
    },
    onClick: () => void 0,
  },

  {
    name: 'WalletConnect',
    description: 'Keplr Mobile',
    image: {
      src: '/wallets/walletconnect-keplr.png',
      width: 66,
      height: 40,
    },
    onClick: onWalletConnectClick,
  },
];

export const socialProvidersMock: LoginProvider[] = [
  {
    name: 'Google',
    image: { src: 'google.png', width: 40, height: 40 },
    onClick: () => void 0,
  },
];
