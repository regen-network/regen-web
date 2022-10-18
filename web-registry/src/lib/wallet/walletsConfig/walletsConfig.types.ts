import { OfflineSigner } from '@cosmjs/proto-signing';
import { ChainInfo, Keplr } from '@keplr-wallet/types';
import WalletConnect from '@walletconnect/client';

import { IKeplrWalletConnectV1 } from '../connectors/connectors.types';

export type WalletClient = Keplr | IKeplrWalletConnectV1;

export enum WalletType {
  Keplr = 'keplr',
  WalletConnectKeplr = 'walletconnect_keplr',
}

type GetClientParams = {
  chainInfo?: ChainInfo;
  walletConnect?: WalletConnect;
};

export interface Wallet {
  // A unique identifier among all wallets.
  type: WalletType;
  // A function that returns an instantiated wallet client, with
  // `walletConnect` passed if `type === WalletType.WalletConnectKeplr`.
  getClient: ({
    chainInfo,
    walletConnect,
  }: GetClientParams) => Promise<WalletClient | undefined>;
  // A function that returns the function to retrieve the `OfflineSigner`
  // for this wallet.
  getOfflineSignerFunction: (
    client: WalletClient,
  ) => (chainId: string) => OfflineSigner | Promise<OfflineSigner>;
}
