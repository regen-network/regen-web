import { useEffect } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { AUTO_CONNECT_WALLET_KEY } from '../wallet.constants';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  setError: UseStateSetter<unknown>;
  setLoaded: UseStateSetter<boolean>;
  connectWallet: ConnectWalletType;
  activeAccountHasAddr: boolean;
};

// Auto connect user if we saved a connection type, from last session, in localstorage
export const useAutoConnect = ({
  setError,
  setLoaded,
  connectWallet,
  activeAccountHasAddr,
}: Props): void => {
  useEffect(() => {
    const autoConnectWalletType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY);
    const tryConnectWallet = async (): Promise<void> => {
      if (autoConnectWalletType || activeAccountHasAddr) {
        try {
          await connectWallet({
            walletType:
              (autoConnectWalletType as WalletType) ?? WalletType.Keplr,
            doLogin: false,
          });
        } catch (e) {
          setError(e);
        } finally {
          setLoaded(true);
        }
      }
    };

    if (autoConnectWalletType || activeAccountHasAddr) {
      tryConnectWallet();
    } else {
      setLoaded(true);
    }
  }, [connectWallet, setError, setLoaded, activeAccountHasAddr]);
};
