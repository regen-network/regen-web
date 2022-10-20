import { MutableRefObject, useCallback } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { ConnectWalletParams } from '../wallet.types';
import { finalizeConnection, getWalletConnectInstance } from '../wallet.utils';
import { walletsConfig } from '../walletsConfig/walletsConfig';
import { WalletConfig, WalletType } from '../walletsConfig/walletsConfig.types';

type Props = {
  setWalletConnectUri: UseStateSetter<string | undefined>;
  setWalletConnect: UseStateSetter<WalletConnect | undefined>;
  onQrCloseCallback: MutableRefObject<(() => void) | undefined>;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  setWallet: UseStateSetter<Wallet>;
};

export type ConnectWalletType = ({
  walletType,
}: ConnectWalletParams) => Promise<void>;

export const useConnectWallet = ({
  onQrCloseCallback,
  setWalletConnectUri,
  walletConfigRef,
  setWallet,
  setWalletConnect,
}: Props): ConnectWalletType => {
  const connectWallet = useCallback(
    async ({ walletType }: ConnectWalletParams): Promise<void> => {
      const walletConfig = walletsConfig.find(
        walletConfig => walletConfig.type === walletType,
      );
      walletConfigRef.current = walletConfig;

      let walletConnect;

      if (walletConfig?.type === WalletType.WalletConnectKeplr) {
        walletConnect = await getWalletConnectInstance({
          setWalletConnectUri,
          onQrCloseCallback,
        });
        if (!walletConnect.connected) {
          await walletConnect.createSession();
        }
        setWalletConnect(walletConnect);
      }

      const walletClient = await walletConfig?.getClient({
        chainInfo,
        walletConnect,
      });

      if (
        walletConfig?.type === WalletType.WalletConnectKeplr &&
        walletConnect?.connected
      ) {
        finalizeConnection({ setWallet, walletClient, walletConfig });
      }

      if (walletConfig?.type === WalletType.Keplr) {
        await walletClient?.experimentalSuggestChain(chainInfo);
        finalizeConnection({ setWallet, walletClient, walletConfig });
      }
    },
    [
      onQrCloseCallback,
      setWallet,
      setWalletConnect,
      setWalletConnectUri,
      walletConfigRef,
    ],
  );

  return connectWallet;
};
