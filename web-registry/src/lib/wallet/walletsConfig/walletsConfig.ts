import { Wallet, WalletType } from './walletsConfig.types';

export const KeplrWallet: Wallet = {
  type: WalletType.Keplr,
  name: 'Keplr Wallet',
  description: 'Keplr Chrome Extension',
  imageUrl: '/keplr-wallet-extension.png',
  getClient: async () =>
    // @ts-ignore
    (await import('@keplr-wallet/stores')).getKeplrFromWindow(),
  getOfflineSignerFunction: client =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerAuto.bind(client),
};

export const WalletConnectKeplrWallet: Wallet = {
  type: WalletType.WalletConnectKeplr,
  name: 'WalletConnect',
  description: 'Keplr Mobile',
  imageUrl: '/walletconnect-keplr.png',
  getClient: async ({ chainInfo, walletConnect }) => {
    if (walletConnect?.connected && chainInfo) {
      return new (await import('../connectors')).KeplrWalletConnectV1(
        walletConnect,
        [chainInfo],
      );
    }
    throw new Error('Mobile wallet not connected.');
  },
  // WalletConnect only supports Amino signing.
  getOfflineSignerFunction: client =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerOnlyAmino.bind(client),
};

export const walletsConfig = [KeplrWallet, WalletConnectKeplrWallet];
