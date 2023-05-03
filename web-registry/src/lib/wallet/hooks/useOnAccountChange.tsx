import { MutableRefObject, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import WalletConnect from '@walletconnect/client';

import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';

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
  walletConnect?: WalletConnect;
  accountId?: string;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  keplrMobileWeb,
  walletConfigRef,
  walletConnect,
  accountId,
}: Props): void => {
  const [newWallet, setNewWallet] = useState<Wallet | undefined>();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: partyByAddr, isFetching } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: newWallet?.address ?? '',
      enabled: !!newWallet?.address && !!graphqlClient,
    }),
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = async (): Promise<void> => {
      if (wallet) {
        // If using Keplr mobile browser, just connect to the new address automatically.
        // This is because Keplr mobile browser or WalletConnect do not support signArbitrary (used in login/addAddress).
        // We are unable to listen on the event with WalletConnect so it's not checked here.
        if (keplrMobileWeb) {
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
        } else {
          const walletClient = await walletConfigRef.current?.getClient({
            chainInfo,
            walletConnect,
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
  }, [wallet, connectWallet, keplrMobileWeb, walletConfigRef, walletConnect]);

  useEffect(() => {
    const newAccountId = partyByAddr?.walletByAddr?.partyByWalletId?.accountId;
    if (!!newWallet && !isFetching) {
      if (!!newAccountId) {
        if (newAccountId === accountId) {
          // the new address is part of the current user account => we just auto-connect
          console.log('connect');
          connectWallet({ walletType: WalletType.Keplr, doLogin: false });
        } else {
          // part of another account => we display a popup so the user can choose to rm the address from the other account and add it to his/her account
          console.log('part of another account');
        }
      } else {
        // not part of any account yet => we trigger the add address flow
        console.log('add address');
      }
    }
  }, [
    accountId,
    connectWallet,
    isFetching,
    newWallet,
    partyByAddr?.walletByAddr?.partyByWalletId?.accountId,
  ]);
};
