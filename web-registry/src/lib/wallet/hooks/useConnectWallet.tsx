import { MutableRefObject, useCallback } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { LoginType, Wallet } from '../wallet';
import { ConnectWalletParams } from '../wallet.types';
import { finalizeConnection, getWalletConnectInstance } from '../wallet.utils';
import { walletsConfig } from '../walletsConfig/walletsConfig';
import { WalletConfig, WalletType } from '../walletsConfig/walletsConfig.types';

type Props = {
  setWalletConnectUri: UseStateSetter<string | undefined>;
  setWalletConnect: UseStateSetter<WalletConnect | undefined>;
  onQrCloseCallbackRef: MutableRefObject<(() => void) | undefined>;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  setWallet: UseStateSetter<Wallet>;
  setKeplrMobileWeb: UseStateSetter<boolean>;
  track?: (
    eventName: string,
    payload?: any,
    options?: any,
    callback?: (...params: any[]) => any,
  ) => Promise<any>;
  login?: LoginType;
};

export type ConnectWalletType = ({
  walletType,
}: ConnectWalletParams) => Promise<void>;

// This hook returns a callback that performs the wallet connection.
// The callback is meant to be called by other hooks.
export const useConnectWallet = ({
  onQrCloseCallbackRef,
  setWalletConnectUri,
  walletConfigRef,
  setWallet,
  setWalletConnect,
  setKeplrMobileWeb,
  track,
  login,
}: Props): ConnectWalletType => {
  const connectWallet = useCallback(
    async ({ walletType, doLogin }: ConnectWalletParams): Promise<void> => {
      const walletConfig = walletsConfig.find(
        walletConfig => walletConfig.type === walletType,
      );
      walletConfigRef.current = walletConfig;

      const isKeplr = walletConfig?.type === WalletType.Keplr;
      const isWalletConnectKeplr =
        walletConfig?.type === WalletType.WalletConnectKeplr;
      let walletConnect;

      if (isWalletConnectKeplr) {
        walletConnect = await getWalletConnectInstance({
          setWalletConnectUri,
          onQrCloseCallbackRef,
        });

        if (!walletConnect.connected) {
          await walletConnect.createSession();
        } else {
          setWalletConnectUri(walletConnect.uri);
        }

        setWalletConnect(walletConnect);
      }

      const walletClient = await walletConfig?.getClient({
        chainInfo,
        walletConnect,
      });

      // Only Keplr browser extension supports suggesting chain.
      // Not WalletConnect nor embedded Keplr Mobile web.
      if (isKeplr && walletClient?.mode !== 'mobile-web') {
        await walletClient?.experimentalSuggestChain(chainInfo);
      }

      if (isKeplr && walletClient?.mode === 'mobile-web') {
        setKeplrMobileWeb(true);
      }

      if ((isWalletConnectKeplr && walletConnect?.connected) || isKeplr) {
        await finalizeConnection({
          setWallet,
          walletClient,
          walletConfig,
          walletConnect,
          track,
          login,
          doLogin,
        });
      }
    },
    [
      onQrCloseCallbackRef,
      setWallet,
      setWalletConnect,
      setWalletConnectUri,
      setKeplrMobileWeb,
      walletConfigRef,
      track,
      login,
    ],
  );

  return connectWallet;
};
