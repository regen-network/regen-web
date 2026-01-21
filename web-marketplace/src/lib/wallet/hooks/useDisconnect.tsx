import { MutableRefObject, useCallback } from 'react';
import { useChainWallet } from '@interchain-kit/react';
import { useSetAtom } from 'jotai';
import { resetBuyCreditsFormAtom } from 'legacy-pages/BuyCredits/BuyCredits.atoms';
import { BUY_CREDITS_FORM_PREFIX } from 'legacy-pages/BuyCredits/BuyCredits.constants';

import { UseStateSetter } from 'types/react/use-state';

import { Wallet } from '../wallet';
import {
  AUTO_CONNECT_WALLET_KEY,
  emptySender,
  WALLET_CONNECT,
} from '../wallet.constants';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConnect?: boolean;
  setWallet: UseStateSetter<Wallet>;
  setConnectionType: UseStateSetter<string | undefined>;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  logout?: () => Promise<void>;
  setWalletConnect: UseStateSetter<boolean>;
};

export type DisconnectType = () => Promise<void>;

export const useDisconnect = ({
  walletConnect,
  setConnectionType,
  setWallet,
  walletConfigRef,
  logout,
  setWalletConnect,
}: Props): DisconnectType => {
  const { disconnect: disconnectWalletConnect } = useChainWallet(
    'regen',
    WALLET_CONNECT,
  );
  const setShouldResetBuyCreditsForm = useSetAtom(resetBuyCreditsFormAtom);

  const disconnect = useCallback(async (): Promise<void> => {
    if (walletConnect) {
      await disconnectWalletConnect();
      setWalletConnect(false);
    }

    setWallet(emptySender);
    setConnectionType(undefined);
    walletConfigRef.current = undefined;
    localStorage.removeItem(AUTO_CONNECT_WALLET_KEY);

    setShouldResetBuyCreditsForm(true);

    // Remove all localStorage items related with the buy credits flow
    Object.keys(localStorage)
      .filter(key => key.startsWith(BUY_CREDITS_FORM_PREFIX))
      .forEach(key => localStorage.removeItem(key));

    // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
    // https://github.com/chainapsis/keplr-wallet/issues/664
    if (!walletConnect && logout) await logout();
  }, [
    walletConnect,
    setWallet,
    setConnectionType,
    walletConfigRef,
    setShouldResetBuyCreditsForm,
    logout,
    setWalletConnect,
    disconnectWalletConnect,
  ]);

  return disconnect;
};
