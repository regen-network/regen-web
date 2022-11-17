import { Wallet } from './WalletModal.types';

type GetWalletsMockParams = {
  onWalletConnectClick: () => void;
};

export const getWalletsMock = ({
  onWalletConnectClick,
}: GetWalletsMockParams): Wallet[] => [
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

export const uriMock = 'https://www.regen.network/';
