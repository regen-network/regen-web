import { useEffect } from 'react';

import { Wallet } from '../wallet';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  connectWallet: ConnectWalletType;
  accountId?: string;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  accountId,
}: Props): void => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (): void => {
      if (wallet) {
        // If no accountId, just connect to the new address automatically.
        // This is to keep support WC and Keplr mobile browser
        // that do not support signArbitrary (used in addAddress)
        if (!accountId) {
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
        } else {
        }
      }
    };

    window.addEventListener('keplr_keystorechange', listener);

    return () => {
      window.removeEventListener('keplr_keystorechange', listener);
    };
  }, [wallet, connectWallet, accountId]);
};
