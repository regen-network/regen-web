import { MutableRefObject } from 'react';
import WalletConnect from '@walletconnect/client';
import truncate from 'lodash/truncate';

import { UseStateSetter } from 'types/react/use-state';
import { chainId } from 'lib/ledger';

import { chainInfo } from './chainInfo/chainInfo';
import { Wallet } from './wallet';
import { walletConnectClientMeta } from './wallet.constants';
import {
  WalletClient,
  WalletConfig,
} from './walletsConfig/walletsConfig.types';

/* getWalletConnectInstance */

type GetWalletConnectInstanceParams = {
  setWalletConnectUri: UseStateSetter<string | undefined>;
  onQrCloseCallback: MutableRefObject<(() => void) | undefined>;
};

export const getWalletConnectInstance = async ({
  setWalletConnectUri,
  onQrCloseCallback,
}: GetWalletConnectInstanceParams): Promise<WalletConnect> => {
  const walletConnect = new (await import('@walletconnect/client')).default({
    bridge: 'https://bridge.walletconnect.org',
    signingMethods: [
      'keplr_enable_wallet_connect_v1',
      'keplr_sign_amino_wallet_connect_v1',
    ],
    qrcodeModal: {
      open: (uri: string, callback: () => void) => {
        // Open QR modal by setting URI.
        setWalletConnectUri(uri);
        onQrCloseCallback.current = callback;
      },
      // Occurs on disconnect, which is handled elsewhere.
      close: () => undefined,
    },
    // clientMeta,
  });
  // clientMeta in constructor is ignored for some reason, so
  // let's set it directly :)))))))))))))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  walletConnect._clientMeta = walletConnectClientMeta;

  return walletConnect;
};

/* finalizeConnection */

type FinalizeConnectionParams = {
  walletClient?: WalletClient;
  walletConfig?: WalletConfig;
  setWallet: UseStateSetter<Wallet>;
};

export const finalizeConnection = async ({
  walletClient,
  walletConfig,
  setWallet,
}: FinalizeConnectionParams): Promise<void> => {
  let offlineSigner;

  try {
    await walletClient?.enable(chainInfo.chainId);
  } catch (e) {
    console.error(e);
  }

  if (walletClient) {
    offlineSigner = await walletConfig?.getOfflineSignerFunction(walletClient)(
      chainInfo.chainId,
    );
  }

  const key = await walletClient?.getKey(chainInfo.chainId);
  if (key && key.bech32Address && offlineSigner) {
    const wallet = {
      offlineSigner,
      address: key.bech32Address,
      shortAddress: truncate(key.bech32Address),
    };
    setWallet(wallet);
  }
};
