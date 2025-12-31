import { OS, Wallet } from '@interchain-kit/core';

/* eslint-disable lingui/no-unlocalized-strings */
export const AUTO_CONNECT_WALLET_KEY = 'auto_connect_wallet';
export const WALLET_CONNECT = 'WalletConnect';

export const KEPLR_LOGIN_TITLE = 'Regen Network Login';
export const KEPLR_LOGIN_DESCRIPTION =
  'This is a transaction that allows Regen Network to authenticate you with our application.';
export const KEPLR_CONNECT_WALLET_DESCRIPTION =
  'This is a transaction that allows Regen Network to connect a wallet address to your account.';

export const walletConnectClientMeta = {
  name: 'Regen Marketplace',
  description: 'Discover Ecocredits and NCT basket tokens',
  url: 'https://app.regen.network/',
  icons: ['https://app.regen.network/png/logo/regen.png'],
};

export const walletConnectOption: Wallet = {
  name: WALLET_CONNECT,
  prettyName: 'Keplr Mobile',
  logo: 'https://app.regen.network/png/logo/regen.png',
  mode: 'wallet-connect',
  downloads: [
    {
      device: 'mobile',
      os: 'android',
      link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr&hl=en&gl=US&pli=1',
    },
    {
      device: 'mobile',
      os: 'ios',
      link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089',
    },
    {
      link: 'https://www.keplr.app/download',
    },
  ],
  walletconnect: {
    name: 'Keplr',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
    encoding: 'base64',
    requiredNamespaces: {
      methods: [
        'keplr_getKey',
        'keplr_signAmino',
        'keplr_signDirect',
        'keplr_signArbitrary',
        'keplr_enable',
        'keplr_signEthereum',
      ],
      events: ['keplr_accountsChanged'],
    },
    mobile: {
      native: {
        ios: 'keplrwallet:',
        android: 'intent:',
      },
    },
    formatNativeUrl: (
      appUrl: string,
      wcUri: string,
      os: OS | undefined,
      _name: string,
    ): string => {
      const plainAppUrl = appUrl.split(':')[0];
      const encodedWcUrl = encodeURIComponent(wcUri);
      switch (os) {
        case 'ios':
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
        case 'android':
          return `intent://wcV2?${encodedWcUrl}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`;
        default:
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
      }
    },
  },
};

export const keplrExtensionInfo: Wallet = {
  windowKey: 'keplr',
  cosmosKey: 'keplr',
  ethereumKey: 'keplr.ethereum',
  walletIdentifyKey: 'keplr.ethereum.isKeplr',
  name: WALLET_CONNECT,
  prettyName: 'Keplr',
  mode: 'extension',
  // logo: ICON,
  keystoreChange: 'keplr_keystorechange',
  downloads: [
    {
      device: 'desktop',
      browser: 'chrome',
      link: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
    },
    {
      device: 'desktop',
      browser: 'firefox',
      link: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/',
    },
    {
      link: 'https://www.keplr.app/download',
    },
  ],
  walletconnect: {
    name: 'Keplr',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  },
  walletConnectLink: {
    android: `intent://wcV2?{wc-uri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`,
    ios: `keplrwallet://wcV2?{wc-uri}`,
  },
};

export const emptySender = { address: '', shortAddress: '' };
