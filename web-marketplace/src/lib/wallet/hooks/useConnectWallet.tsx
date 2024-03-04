import { MutableRefObject, useCallback } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { LoginType, Wallet } from '../wallet';
import { ConnectWalletParams } from '../wallet.types';
import { finalizeConnection } from '../wallet.utils';
import { walletsConfig } from '../walletsConfig/walletsConfig';
import { WalletConfig, WalletType } from '../walletsConfig/walletsConfig.types';
import { Track } from 'lib/tracker/types';

type Props = {
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  setWallet: UseStateSetter<Wallet>;
  setKeplrMobileWeb: UseStateSetter<boolean>;
  login?: LoginType;
  logout?: () => Promise<void>;
};

export type ConnectWalletType = ({
  walletType,
}: ConnectWalletParams) => Promise<Wallet | undefined>;

// This hook returns a callback that performs the wallet connection.
// The callback is meant to be called by other hooks.
export const useConnectWallet = ({
  walletConfigRef,
  setWallet,
  setKeplrMobileWeb,
  login,
}: Props): ConnectWalletType => {
  const connectWallet = useCallback(
    async ({
      walletType,
      doLogin,
      doLogout,
    }: ConnectWalletParams): Promise<Wallet | undefined> => {
      const walletConfig = walletsConfig.find(
        walletConfig => walletConfig.type === walletType,
      );
      walletConfigRef.current = walletConfig;

      const isKeplr = walletConfig?.type === WalletType.Keplr;

      const walletClient = await walletConfig?.getClient({
        chainInfo,
      });

      // Only Keplr browser extension supports suggesting chain.
      // Not WalletConnect nor embedded Keplr Mobile web.
      if (isKeplr && walletClient?.mode !== 'mobile-web') {
        await walletClient?.experimentalSuggestChain(chainInfo);
      }

      if (isKeplr && walletClient?.mode === 'mobile-web') {
        setKeplrMobileWeb(true);
      }

      if (isKeplr) {
        const wallet = await finalizeConnection({
          setWallet,
          walletClient,
          walletConfig,
          login,
          doLogin,
          doLogout,
        });
        return wallet;
      }
    },
    [setWallet, setKeplrMobileWeb, walletConfigRef, login],
  );

  return connectWallet;
};
