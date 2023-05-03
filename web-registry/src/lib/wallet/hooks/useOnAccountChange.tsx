import { useEffect } from 'react';
import WalletConnect from '@walletconnect/client';

import { Wallet } from '../wallet';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  connectWallet: ConnectWalletType;
  keplrMobileWeb: boolean;
  walletConnect?: WalletConnect;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  keplrMobileWeb,
  walletConnect,
}: Props): void => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = (): void => {
      if (wallet) {
        // If using Keplr mobile browser or WC, just connect to the new address automatically.
        // This is because Keplr mobile browser or WC do not support signArbitrary (used in login/addAddress).
        if (keplrMobileWeb || !!walletConnect) {
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
        } else {
          // We need to check whether the address is:
          //  - part of the current user account => we just auto-connect
          //  - or part of another account => we display a popup so the user can choose to rm the address from the other account and add it to his/her account
          //  - or not part of any account yet => we trigger the add address flow
        }
      }
    };

    window.addEventListener('keplr_keystorechange', listener);

    return () => {
      window.removeEventListener('keplr_keystorechange', listener);
    };
  }, [wallet, connectWallet, keplrMobileWeb, walletConnect]);
};
