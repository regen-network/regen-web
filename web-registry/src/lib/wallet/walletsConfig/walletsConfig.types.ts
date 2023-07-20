import { OfflineSigner } from '@cosmjs/proto-signing';
import { ChainInfo, Keplr } from '@keplr-wallet/types';

export type WalletClient = Keplr;

export enum WalletType {
  Keplr = 'keplr',
  WalletConnectKeplr = 'walletconnect_keplr',
}

type GetClientParams = {
  chainInfo?: ChainInfo;
};

export interface WalletConfig {
  type: WalletType;
  // A function that returns an instantiated wallet client.
  getClient: ({
    chainInfo,
  }: GetClientParams) => Promise<WalletClient | undefined>;
  // A function that returns the function to retrieve the `OfflineSigner`
  // for this wallet.
  getOfflineSignerFunction: (
    client: WalletClient,
  ) => (chainId: string) => OfflineSigner | Promise<OfflineSigner>;
}
