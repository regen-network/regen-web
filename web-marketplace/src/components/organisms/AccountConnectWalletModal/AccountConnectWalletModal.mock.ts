/* eslint-disable lingui/no-unlocalized-strings */
import { LoginProvider } from './AccountConnectWalletModal.types';

type GetWalletsMockParams = {
  onWalletConnectClick: () => void;
};

export const getWalletsMock = ({
  onWalletConnectClick,
}: GetWalletsMockParams): LoginProvider[] => [
  {
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    imageUrl: '/wallets/keplr-wallet-extension.png',
    onClick: () => void 0,
  },

  {
    name: 'WalletConnect',
    description: 'Keplr Mobile',
    imageUrl: '/wallets/walletconnect-keplr.png',
    onClick: onWalletConnectClick,
  },
];

export const socialProvidersMock: LoginProvider[] = [
  {
    name: 'Google',
    imageUrl: 'google.png',
    onClick: () => void 0,
  },
];
