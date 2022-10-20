import { useEffect } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { AUTO_CONNECT_WALLET_KEY } from '../wallet.constants';
import { ConnectWalletParams } from '../wallet.types';
import { WalletType } from '../walletsConfig/walletsConfig.types';

type Props = {
  setError: UseStateSetter<unknown>;
  setLoaded: UseStateSetter<boolean>;
  connectWallet: ({ walletType }: ConnectWalletParams) => Promise<void>;
};

export const useAutoConnect = ({
  setError,
  setLoaded,
  connectWallet,
}: Props): void => {
  useEffect(() => {
    const autoConnectWalletType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY);

    const tryConnectWallet = async (): Promise<void> => {
      if (autoConnectWalletType) {
        try {
          await connectWallet({
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
