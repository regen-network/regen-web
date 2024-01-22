import { useCallback } from 'react';
import { useSetAtom } from 'jotai';

import { DEFAULT_DURATION } from 'web-components/src/components/banner/ErrorBanner';

import { UseStateSetter } from 'types/react/use-state';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { AUTO_CONNECT_WALLET_KEY } from '../wallet.constants';
import { ConnectParams } from '../wallet.types';
import { WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  setError: UseStateSetter<unknown>;
  setConnectionType: UseStateSetter<string | undefined>;
  connectWallet: ConnectWalletType;
};

type ConnectType = ({ walletType }: ConnectParams) => Promise<void>;

// This hook returns a callback meant to be called by the UI (ie: LoginButton)
export const useConnect = ({
  setError,
  connectWallet,
  setConnectionType,
}: Props): ConnectType => {
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const connect = useCallback(
    async ({ walletType, doLogin }: ConnectParams): Promise<void> => {
      try {
        if (walletType === WalletType.Keplr && !window.keplr) {
          throw new Error(
            'Please install Keplr extension to use Regen Ledger feature',
          );
        }

        await connectWallet({ walletType, doLogin });
        setConnectionType(walletType);

        if (walletType === WalletType.Keplr) {
          localStorage.setItem(AUTO_CONNECT_WALLET_KEY, WalletType.Keplr);
        } else {
          localStorage.setItem(
            AUTO_CONNECT_WALLET_KEY,
            WalletType.WalletConnectKeplr,
          );
        }
      } catch (e) {
        setErrorBannerTextAtom(String(e));
        setTimeout(() => setError(undefined), DEFAULT_DURATION);
      }
    },
    [connectWallet, setConnectionType, setError, setErrorBannerTextAtom],
  );

  return connect;
};
