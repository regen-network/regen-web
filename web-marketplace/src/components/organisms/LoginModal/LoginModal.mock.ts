import { LoginProvider } from './LoginModal.types';

export const wallets: LoginProvider[] = [
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
    onClick: () => void 0,
  },
];

export const socialProvidersMock: LoginProvider[] = [
  {
    name: 'Google',
    imageUrl: 'google.png',
    onClick: () => void 0,
  },
];
