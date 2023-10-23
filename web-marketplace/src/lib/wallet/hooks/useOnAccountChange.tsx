import { MutableRefObject, useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { UseStateSetter } from 'types/react/use-state';
import {
  addWalletModalConnectAtom,
  addWalletModalRemoveAtom,
} from 'lib/atoms/modals.atoms';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { getWallet } from '../wallet.utils';
import { WalletConfig, WalletType } from '../walletsConfig/walletsConfig.types';
import { AddAddressParams } from './useAddAddress';
import { ConnectWalletType } from './useConnectWallet';

type Props = {
  wallet: Wallet;
  connectWallet: ConnectWalletType;
  keplrMobileWeb: boolean;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  accountId?: string;
  addAddress: (params: AddAddressParams) => Promise<void>;
  setAccountChanging: UseStateSetter<boolean>;
};

export const useOnAccountChange = ({
  wallet,
  connectWallet,
  keplrMobileWeb,
  walletConfigRef,
  accountId,
  addAddress,
  setAccountChanging,
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
  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const setAddWalletModalConnectAtom = useSetAtom(addWalletModalConnectAtom);
  const setAddWalletModalRemoveAtom = useSetAtom(addWalletModalRemoveAtom);

  // Set new wallet or directly connect it for Keplr mobile browser
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
  //  - Automatically connect if address already part of current account
  //  - Ask the user to move the address to his/her account if part of another account
  //  - Prompt the user to add the new address not linked to any account
  useEffect(() => {
    const onAccountChange = async (): Promise<void> => {
      const newAccountId =
        partyByAddr?.walletByAddr?.partyByWalletId?.accountId;
      if (
        !!wallet?.address &&
        !!newWallet &&
        !isFetching &&
        newWallet.address !== wallet?.address
      ) {
        const partyInfo = {
          addr: newWallet.shortAddress,
          name: party?.name ? party?.name : DEFAULT_NAME,
          profileImage: party?.image ? party?.image : defaultAvatar,
        };

        if (!!newAccountId) {
          if (newAccountId === accountId) {
            // the new address is part of the current user account => we just auto-connect
            await connectWallet({
              walletType: WalletType.Keplr,
              doLogin: false,
            });
            setAccountChanging(false);
          } else {
            // part of another account => we display a popup so the user can choose to rm the address from the other account and add it to his/her account
            setAddWalletModalRemoveAtom(atom => {
              atom.open = true;
              atom.partyInfo = partyInfo;
              atom.onClick = () => {
                addAddress({
                  walletConfig: walletConfigRef.current,
                  wallet,
                  accountId,
                  onSuccess: () => {
                    setAddWalletModalRemoveAtom(
                      atom => void (atom.open = false),
                    );
                    setAccountChanging(false);
                  },
                });
              };
            });
          }
        } else {
          // not part of any account yet => we trigger the add address flow
          setAddWalletModalConnectAtom(atom => {
            atom.open = true;
            atom.partyInfo = partyInfo;
          });
          await addAddress({
            walletConfig: walletConfigRef.current,
            wallet,
            accountId,
            onSuccess: () => {
              setAddWalletModalConnectAtom(atom => void (atom.open = false));
              setAccountChanging(false);
            },
          });
        }
      }
    };

    onAccountChange();
  }, [
    accountId,
    addAddress,
    connectWallet,
    defaultAvatar,
    isFetching,
    newWallet,
    party?.image,
    party?.name,
    partyByAddr?.walletByAddr?.partyByWalletId?.accountId,
    setAccountChanging,
    setAddWalletModalConnectAtom,
    setAddWalletModalRemoveAtom,
    wallet,
    walletConfigRef,
  ]);
};
