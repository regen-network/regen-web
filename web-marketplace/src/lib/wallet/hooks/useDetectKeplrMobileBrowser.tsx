import { useEffect } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { Wallet } from '../wallet';
import { AUTO_CONNECT_WALLET_KEY } from '../wallet.constants';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  loaded: boolean;
  connectWallet: ConnectWalletType;
  setKeplrMobileWeb: UseStateSetter<boolean>;
};

// This hooks handle the keplr native app integration connection
export const useDetectKeplrMobileBrowser = ({
  wallet,
  connectWallet,
  loaded,
  setKeplrMobileWeb,
}: Props): void => {
  useEffect(() => {
    if (typeof window === 'undefined' || !loaded || wallet.address !== '') {
      return;
    }

    import('@keplr-wallet/stores')
      .then(({ getKeplrFromWindow }) => getKeplrFromWindow())
      .then(keplr => {
        if (keplr && keplr.mode === 'mobile-web') {
          // When used within Keplr mobile browser the connection type is the same
          // as with the desktop extension.
          setKeplrMobileWeb(true);
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
          localStorage.setItem(AUTO_CONNECT_WALLET_KEY, WalletType.Keplr);
        }
      });
  }, [connectWallet, loaded, wallet, setKeplrMobileWeb]);
};
