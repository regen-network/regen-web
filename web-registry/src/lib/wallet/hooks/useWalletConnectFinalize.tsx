import { MutableRefObject, useEffect } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { finalizeConnection } from '../wallet.utils';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  walletConnect?: WalletConnect;
  setWallet: UseStateSetter<Wallet>;
};

export const useWalletConnectFinalize = ({
  setWallet,
  walletConfigRef,
  walletConnect,
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
  }, [setWallet, walletConnect, walletConfigRef]);
};
