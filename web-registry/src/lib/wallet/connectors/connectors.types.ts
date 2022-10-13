import { Keplr } from '@keplr-wallet/types';

import { KeplrGetKeyWalletConnectV1Response } from './connectors.walletconnect-keplr';

export interface IKeplrWalletConnectV1 extends Keplr {
  dontOpenAppOnEnable: boolean;
}

export type getAllLastSeenKeyResponse = Promise<
  | {
      [chainId: string]: KeplrGetKeyWalletConnectV1Response | undefined;
    }
  | undefined
>;
