import { MutableRefObject } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { walletConnectClientMeta } from './wallet.constants';

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
