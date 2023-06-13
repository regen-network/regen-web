export const AUTO_CONNECT_WALLET_KEY = 'auto_connect_wallet';
export const WALLET_CONNECT_KEY = 'walletconnect';
export const WALLET_CONNECT_BRIDGE_URL = 'https://bridge.walletconnect.org';
export const WALLET_CONNECT_SIGNING_METHODS = [
  'keplr_enable_wallet_connect_v1',
  'keplr_sign_amino_wallet_connect_v1',
];
export const KEPLR_LOGIN_TITLE = 'Regen Network Login';
export const KEPLR_LOGIN_DESCRIPTION =
  'This is a transaction that allows Regen Network to authenticate you with our application.';
export const KEPLR_ADD_ADDR_DESCRIPTION =
  'This is a transaction that allows Regen Network to add an address to your account.';

export const walletConnectClientMeta = {
  name: 'Regen Marketplace',
  description: 'Discover Ecocredits and NCT basket tokens',
  url: 'https://app.regen.network/',
  icons: ['https://app.regen.network/png/logo/regen.png'],
};

export const emptySender = { address: '', shortAddress: '' };
