import { MutableRefObject, useCallback, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import {
  addWalletModalConnectAtom,
  addWalletModalRemoveAtom,
  addWalletModalSwitchAtom,
} from 'lib/atoms/modals.atoms';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { getWallet } from '../wallet.utils';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';
import { AddAddressParams } from './useAddAddress';

type Props = {
  wallet: Wallet;
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  accountId?: string;
  addAddress: (params: AddAddressParams) => Promise<void>;
};

type HandleAddAddressType = () => Promise<void>;

// This hook returns a callback meant to be called by the UI (ie: add address button)
export const useHandleAddAddress = ({
  wallet,
  walletConfigRef,
  accountId,
  addAddress,
}: Props): HandleAddAddressType => {
  const [newWallet, setNewWallet] = useState<Wallet | undefined>();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { refetch } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: newWallet?.address ?? '',
      enabled: !!newWallet?.address && !!graphqlClient,
    }),
  );

  const setAddWalletModalConnectAtom = useSetAtom(addWalletModalConnectAtom);
  const setAddWalletModalRemoveAtom = useSetAtom(addWalletModalRemoveAtom);
  const setAddWalletModalSwitchAtom = useSetAtom(addWalletModalSwitchAtom);

  const handleAddAddress = useCallback(async () => {
    const walletClient = await walletConfigRef.current?.getClient({
      chainInfo,
    });
    const _newWallet = await getWallet({
      walletClient,
      walletConfig: walletConfigRef.current,
    });
    if (!!_newWallet) {
      setNewWallet(_newWallet);
      const { data: partyByAddr } = await refetch();
      if (_newWallet.address === wallet?.address) {
        setAddWalletModalSwitchAtom(atom => {
          atom.open = true;
        });
      } else {
        const party = partyByAddr?.walletByAddr?.partyByWalletId;
        const newAccountId = party?.accountId;
        const partyInfo = {
          addr: _newWallet.shortAddress,
          name: party?.name ? party?.name : DEFAULT_NAME,
          profileImage: party?.image ? party?.image : getDefaultAvatar(party),
        };
        if (!!newAccountId) {
          // the case where newAccountId === accountId is already handled in `useOnAccountChange`
          if (newAccountId !== accountId) {
            // part of another account => we display a popup so the user can choose to rm the address from the other account and add it to his/her account
            setAddWalletModalRemoveAtom(atom => {
              atom.open = true;
              atom.partyInfo = partyInfo;
              atom.onClick = () => {
                addAddress({
                  walletConfig: walletConfigRef.current,
                  wallet,
                  accountId,
                  onSuccess: () =>
                    setAddWalletModalRemoveAtom(
                      atom => void (atom.open = false),
                    ),
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
          addAddress({
            walletConfig: walletConfigRef.current,
            wallet,
            accountId,
            onSuccess: () =>
              setAddWalletModalConnectAtom(atom => void (atom.open = false)),
          });
        }
      }
    }
  }, [
    accountId,
    addAddress,
    refetch,
    setAddWalletModalConnectAtom,
    setAddWalletModalRemoveAtom,
    setAddWalletModalSwitchAtom,
    wallet,
    walletConfigRef,
  ]);

  return handleAddAddress;
};
