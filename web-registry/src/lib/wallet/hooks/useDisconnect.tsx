import { MutableRefObject, useCallback } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { Wallet } from '../wallet';
import {
  AUTO_CONNECT_WALLET_KEY,
  emptySender,
  WALLET_CONNECT_KEY,
} from '../wallet.constants';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConnect?: boolean;
  setWallet: UseStateSetter<Wallet>;
  setConnectionType: UseStateSetter<string | undefined>;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  logout?: () => Promise<void>;
};

export type DisconnectType = () => Promise<void>;

export const useDisconnect = ({
  walletConnect,
  setConnectionType,
  setWallet,
  walletConfigRef,
  logout,
}: Props): DisconnectType => {
  const disconnect = useCallback(async (): Promise<void> => {
    // TODO
    if (walletConnect) {
    }

    setWallet(emptySender);
    setConnectionType(undefined);
    walletConfigRef.current = undefined;
    localStorage.removeItem(AUTO_CONNECT_WALLET_KEY);
    localStorage.removeItem(WALLET_CONNECT_KEY);

    // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
    // https://github.com/chainapsis/keplr-wallet/issues/664
    if (!walletConnect && logout) await logout();
  }, [setConnectionType, setWallet, walletConfigRef, walletConnect, logout]);

  return disconnect;
};
