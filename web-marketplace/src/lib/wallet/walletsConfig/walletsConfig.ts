import { WalletConfig, WalletType } from './walletsConfig.types';

export const KeplrWallet: WalletConfig = {
  type: WalletType.Keplr,
  getClient: async () =>
    // @ts-ignore
    (await import('@keplr-wallet/stores')).getKeplrFromWindow(),
  getOfflineSignerFunction: client =>
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerOnlyAmino.bind(client),
};

export const walletsConfig = [KeplrWallet];
