import { MutableRefObject, useEffect } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { LoginType, Wallet } from '../wallet';
import { finalizeConnection } from '../wallet.utils';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  walletConnect?: WalletConnect;
  setWallet: UseStateSetter<Wallet>;
  login?: LoginType;
};

export const useWalletConnectFinalize = ({
  setWallet,
  walletConfigRef,
  walletConnect,
  login,
}: Props): void => {
  useEffect(() => {
    const onWalletConnectEvent = async (): Promise<void> => {
      const walletClient = await walletConfigRef.current?.getClient({
        chainInfo,
        walletConnect,
      });

      finalizeConnection({
        setWallet,
        walletClient,
        walletConfig: walletConfigRef.current,
        walletConnect,
        login,
      });
    };

    if (walletConnect) {
      walletConnect.on('connect', error => {
        if (error) {
          throw error;
        }

        onWalletConnectEvent();
      });
    }
  }, [setWallet, walletConnect, walletConfigRef, login]);
};
