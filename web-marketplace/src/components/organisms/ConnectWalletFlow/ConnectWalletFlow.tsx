import { useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import admin from 'lib/admin';
import { useAuth } from 'lib/auth/auth';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { AddressUsedWithEmailModal } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.AddressUsedModal';
import { AddressUsedModal } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.AddressUsedWithEmailModal';
import { SelectAccountModal } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.SelectAccountModal';
import { useConnectWalletToAccount } from 'components/organisms/ConnectWalletFlow/hooks/useConnectWalletToAccount';

type ConnectWalletFlowProps = {
  onConnectModalClose: () => void;
  isConnectModalOpened: boolean;
  setError: (e: unknown) => void;
};
export const ConnectWalletFlow = ({
  isConnectModalOpened,
  onConnectModalClose,
  setError,
}: ConnectWalletFlowProps) => {
  const { wallet } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
  const [addressUsedModalOpen, setAddressUsedModalOpen] = useState(false);
  const [addressUsedWithEmailModalOpen, setAddressUsedWithEmailModalOpen] =
    useState(false);
  const [selectAccountModalOpen, setSelectAccountModalOpen] = useState(false);

  useConnectWalletToAccount({
    isConnectModalOpened,
    onConnectModalClose,
    setError,
    setAddressUsedModalOpen,
    setAddressUsedWithEmailModalOpen,
  });

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: walletAccountData } = useQuery(
    getAccountByAddrQuery({
      addr: wallet?.address as string,
      client: graphqlClient,
      enabled: !!wallet?.address && !!graphqlClient,
    }),
  );
  const walletAccount = walletAccountData?.accountByAddr;

  return (
    <>
      <AddressUsedWithEmailModal
        open={addressUsedWithEmailModalOpen}
        onClose={() => setAddressUsedWithEmailModalOpen(false)}
      />
      <AddressUsedModal
        open={addressUsedModalOpen}
        onClose={() => setAddressUsedModalOpen(false)}
        next={() => {
          setAddressUsedModalOpen(false);
          setSelectAccountModalOpen(true);
        }}
      />
      {activeAccount && privActiveAccount && wallet && walletAccount && (
        <SelectAccountModal
          open={true}
          onClose={() => setSelectAccountModalOpen(false)}
          accounts={[
            {
              ...activeAccount,
              current: true,
              email: privActiveAccount.email || privActiveAccount.google_email,
            },
            { ...walletAccount, current: false, addr: wallet.address },
          ]}
          merge={async (e: boolean) => {}}
        />
      )}
    </>
  );
};
