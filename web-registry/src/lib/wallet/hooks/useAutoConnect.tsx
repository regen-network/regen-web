import { useEffect } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { AUTO_CONNECT_WALLET_KEY } from '../wallet.constants';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  setError: UseStateSetter<unknown>;
  setLoaded: UseStateSetter<boolean>;
  connectWallet: ConnectWalletType;
};

// Auto connect user if we saved a connection type, from last session, in localstorage
export const useAutoConnect = ({
  setError,
  setLoaded,
  connectWallet,
}: Props): void => {
  useEffect(() => {
    const autoConnectWalletType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY);

    const tryConnectWallet = (): void => {
      if (autoConnectWalletType) {
        try {
          connectWallet({
            walletType: autoConnectWalletType as WalletType,
          });
        } catch (e) {
          setError(e);
        } finally {
          setLoaded(true);
        }
      }
    };

    if (autoConnectWalletType) {
      tryConnectWallet();
    } else {
      setLoaded(true);
    }
  }, [connectWallet, setError, setLoaded]);
};
