import { MutableRefObject } from 'react';
import WalletConnect from '@walletconnect/client';
import truncate from 'lodash/truncate';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from './chainInfo/chainInfo';
import { Wallet } from './wallet';
import {
  WALLET_CONNECT_BRIDGE_URL,
  WALLET_CONNECT_SIGNING_METHODS,
  walletConnectClientMeta,
} from './wallet.constants';
import {
  WalletClient,
  WalletConfig,
} from './walletsConfig/walletsConfig.types';

/* getWalletConnectInstance */

type GetWalletConnectInstanceParams = {
  setWalletConnectUri: UseStateSetter<string | undefined>;
  onQrCloseCallbackRef: MutableRefObject<(() => void) | undefined>;
};

export const getWalletConnectInstance = async ({
  setWalletConnectUri,
  onQrCloseCallbackRef,
}: GetWalletConnectInstanceParams): Promise<WalletConnect> => {
  const walletConnect = new (await import('@walletconnect/client')).default({
    bridge: WALLET_CONNECT_BRIDGE_URL,
    signingMethods: WALLET_CONNECT_SIGNING_METHODS,
    qrcodeModal: {
      // The protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads.
      // These payloads are symmetrically encrypted through a shared key between the two peers.
      // The connection is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this connection request.
      open: (uri: string, onQrCloseCallback: () => void) => {
        setWalletConnectUri(uri);
        onQrCloseCallbackRef.current = onQrCloseCallback;
      },
      close: () => undefined,
    },
  });
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
    // eslint-disable-next-line no-console
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
