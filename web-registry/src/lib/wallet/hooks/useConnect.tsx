import { useCallback } from 'react';

import { UseStateSetter } from 'types/react/use-state';

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

export const useConnect = ({
  setError,
  connectWallet,
  setConnectionType,
}: Props): ConnectType => {
  const connect = useCallback(
    async ({ walletType }: ConnectParams): Promise<void> => {
      try {
        await connectWallet({ walletType });
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
        setError(e);
      }
    },
    [connectWallet, setConnectionType, setError],
  );

  return connect;
};
