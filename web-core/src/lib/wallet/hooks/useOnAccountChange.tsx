import { MutableRefObject, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { AccountByIdQuery } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { accountSwitchModalAtom } from 'lib/atoms/modals.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { getWallet } from '../wallet.utils';
import { WalletConfig, WalletType } from '../walletsConfig/walletsConfig.types';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  connectWallet: ConnectWalletType;
  keplrMobileWeb: boolean;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  activeAccount?: AccountByIdQuery['accountById'];
  authenticatedAccountIds?: string[];
  setAccountChanging: UseStateSetter<boolean>;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  keplrMobileWeb,
  walletConfigRef,
  activeAccount,
  authenticatedAccountIds,
  setAccountChanging,
}: Props): void => {
  const [newWallet, setNewWallet] = useState<Wallet | undefined>();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: accountByAddr, isFetching } = useQuery(
    getAccountByAddrQuery({
      client: graphqlClient,
      addr: newWallet?.address ?? '',
      enabled: !!newWallet?.address && !!graphqlClient,
    }),
  );
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const setAccountSwitchModalAtom = useSetAtom(accountSwitchModalAtom);

  // Set new wallet or directly connect it for Keplr mobile browser
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = async (): Promise<void> => {
      if (wallet) {
        // If using Keplr mobile browser, just connect to the new address automatically.
        // This is because Keplr mobile browser or WalletConnect do not support signArbitrary (used in login).
        // We are unable to listen on the event with WalletConnect so it's not checked here.
        if (keplrMobileWeb) {
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
        } else {
          setAccountChanging(true);

          const walletClient = await walletConfigRef.current?.getClient({
            chainInfo,
          });
          const _newWallet = await getWallet({
            walletClient,
            walletConfig: walletConfigRef.current,
          });

          if (activeAccount?.addr !== _newWallet?.address) {
            setAccountSwitchModalAtom(
              atom =>
                void ((atom.open = true), (atom.prevAddr = wallet?.address)),
            );
            if (!!_newWallet) setNewWallet(_newWallet);
          } else {
            // The following is to handle the case where the user switches to another account,
            // but then decide to switch back to the first account without logging in with the new one.
            await connectWallet({
              walletType: WalletType.Keplr,
              doLogin: false,
            });
            setNewWallet(undefined);
            setAccountSwitchModalAtom(atom => void (atom.open = false));
            setAccountChanging(false);
          }
        }
      }
    };

    window.addEventListener('keplr_keystorechange', listener);

    return () => {
      window.removeEventListener('keplr_keystorechange', listener);
    };
  }, [
    wallet,
    connectWallet,
    keplrMobileWeb,
    walletConfigRef,
    setAccountChanging,
  ]);

  // Prompt the user to login to the new account if different from the current account
  useEffect(() => {
    const onAccountChange = async (): Promise<void> => {
      const newAccountId = accountByAddr?.accountByAddr?.id;
      if (
        !!wallet?.address &&
        !!newWallet &&
        !isFetching &&
        newWallet.address !== wallet?.address
      ) {
        if (newAccountId !== activeAccount?.id && token) {
          await connectWallet({
            walletType: WalletType.Keplr,
            doLogin: true,
            doLogout: true,
          });
          setAccountSwitchModalAtom(atom => void (atom.open = false));
        } else {
          await connectWallet({
            walletType: WalletType.Keplr,
            doLogin: false,
          });
        }
        setAccountChanging(false);
      }
    };

    onAccountChange();
  }, [
    connectWallet,
    isFetching,
    newWallet,
    setAccountChanging,
    wallet,
    walletConfigRef,
    activeAccount?.id,
    accountByAddr?.accountByAddr?.id,
    token,
    authenticatedAccountIds,
    reactQueryClient,
    retryCsrfRequest,
  ]);
};
