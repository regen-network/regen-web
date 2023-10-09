import { apiUri } from 'lib/apiUri';

export const mobileWalletsName = ['WalletConnect'];

export const socialProviders = [
  {
    name: 'Google',
    imageUrl: '/png/google.png',
    onClick: () => {
      window.location.href = `${apiUri}/marketplace/v1/auth/google`;
    },
  },
];
