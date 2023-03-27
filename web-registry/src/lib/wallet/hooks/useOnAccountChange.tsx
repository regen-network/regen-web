import { useEffect } from 'react';

import { Wallet } from '../wallet';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  connectWallet: ConnectWalletType;
};

export const useOnAccountChange = ({ wallet, connectWallet }: Props): void => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (): void => {
      if (wallet) {
        connectWallet({ walletType: WalletType.Keplr, doLogin: false });
      }
    };

    window.addEventListener('keplr_keystorechange', listener);

    return () => {
      window.removeEventListener('keplr_keystorechange', listener);
    };
  }, [wallet, connectWallet]);
};
