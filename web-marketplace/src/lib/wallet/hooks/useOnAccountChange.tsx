import { MutableRefObject, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
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
  activeAccountId?: string;
  authenticatedAccountIds?: string[];
  setAccountChanging: UseStateSetter<boolean>;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  keplrMobileWeb,
  walletConfigRef,
  activeAccountId,
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

          if (!!_newWallet) setNewWallet(_newWallet);
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

  // Perform one of the following actions given the new wallet address:
  //  - Automatically connect if address part of the authenticated accounts
  //  - Else, prompt the user to login with keplr
  useEffect(() => {
    const onAccountChange = async (): Promise<void> => {
      const newAccountId = accountByAddr?.accountByAddr?.id;
      if (
        !!wallet?.address &&
        !!newWallet &&
        !isFetching &&
        newWallet.address !== wallet?.address
      ) {
        if (newAccountId !== activeAccountId && token) {
          if (authenticatedAccountIds?.includes(newAccountId)) {
            // the new address is part of the authenticated accounts ids, we auto-connect...
            await connectWallet({
              walletType: WalletType.Keplr,
              doLogin: false,
            });
            // and update the active account id
            await postData({
              url: `${apiUri}/marketplace/v1/auth/accounts`,
              data: {
                accountId: newAccountId,
              },
              token,
            });
            setAccountChanging(false);
          } else {
            // login with keplr so the new account gets added to the authenticated accounts and set as the active account
            await connectWallet({
              walletType: WalletType.Keplr,
              doLogin: true,
            });
          }
        }
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
    activeAccountId,
    accountByAddr?.accountByAddr?.id,
    token,
    authenticatedAccountIds,
  ]);
};
