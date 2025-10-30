import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { AccountByIdQuery } from 'generated/graphql';
import type { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import type { Wallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { useLoginData } from '../../LoginButton/hooks/useLoginData';
import { useOrganizationMenuProfile } from './useOrganizationMenuProfile';

type UseOrganizationActionsParams = {
  activeAccount: AccountByIdQuery['accountById'];
  privActiveAccount: PrivateAccount | undefined;
  wallet?: Wallet | null;
  connect?: (...args: any[]) => void;
  isConnected: boolean;
};

export const useOrganizationActions = ({
  activeAccount,
  privActiveAccount,
  wallet,
  connect,
  isConnected,
}: UseOrganizationActionsParams) => {
  const { modalState, onButtonClick, onModalClose, walletsUiConfig } =
    useLoginData({});

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [shouldRedirectToCreateOrg, setShouldRedirectToCreateOrg] =
    useState(false);
  const [, setError] = useState<unknown>();

  const { defaultAvatar, menuOrganizationProfile, unfinalizedOrgCreation } =
    useOrganizationMenuProfile({
      activeAccount,
      wallet,
    });
  const router = useRouter();

  const createOrganization = useCallback(() => {
    if (privActiveAccount && !isConnected) {
      setShouldRedirectToCreateOrg(true);
      setIsConnectWalletModalOpen(true);
      onButtonClick();
    } else if (isConnected) {
      router.push('/organizations/create');
    }
  }, [router, privActiveAccount, isConnected, onButtonClick]);

  const finishOrgCreation = useCallback(() => {
    onButtonClick();
    router.push('/organizations/create');
  }, [router, onButtonClick]);

  const handleConnectWalletModalClose = useCallback(() => {
    setIsConnectWalletModalOpen(false);
    setShouldRedirectToCreateOrg(false);
    onModalClose();
  }, [onModalClose]);

  const handleWalletConnect = useCallback(() => {
    connect?.({
      walletType: WalletType.Keplr,
      doLogin: true,
    });
  }, [connect]);

  useEffect(() => {
    if (shouldRedirectToCreateOrg && isConnected && !isConnectWalletModalOpen) {
      setShouldRedirectToCreateOrg(false);
      router.push('/organizations/create');
    }
  }, [
    shouldRedirectToCreateOrg,
    isConnected,
    isConnectWalletModalOpen,
    router,
  ]);

  return {
    modalState,
    walletsUiConfig,
    createOrganization,
    finishOrgCreation,
    defaultAvatar,
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    isConnectWalletModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
    setError,
  };
};
