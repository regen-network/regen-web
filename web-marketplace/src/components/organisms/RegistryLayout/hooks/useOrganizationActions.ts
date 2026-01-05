import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { useLoginData } from '../../LoginButton/hooks/useLoginData';
import { useOrganizationMenuProfile } from './useOrganizationMenuProfile';
import { shouldRedirectToCreateOrgAtom } from 'legacy-pages/Dashboard/Dashboard.store';

export const useOrganizationActions = () => {
  const { activeAccount, privActiveAccount } = useAuth();
  const { wallet, connect, isConnected } = useWallet();
  const { modalState, onButtonClick, onModalClose, walletsUiConfig } =
    useLoginData({});

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [shouldRedirectToCreateOrg, setShouldRedirectToCreateOrg] = useAtom(
    shouldRedirectToCreateOrgAtom,
  );

  const {
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    unfinalizedOrgName,
  } = useOrganizationMenuProfile({
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
  }, [
    router,
    privActiveAccount,
    isConnected,
    onButtonClick,
    setShouldRedirectToCreateOrg,
  ]);

  const finishOrgCreation = useCallback(() => {
    onButtonClick();
    router.push('/organizations/create');
  }, [router, onButtonClick]);

  const handleConnectWalletModalClose = useCallback(() => {
    setIsConnectWalletModalOpen(false);
    setShouldRedirectToCreateOrg(false);
    onModalClose();
  }, [onModalClose, setShouldRedirectToCreateOrg]);

  const handleWalletConnect = useCallback(() => {
    connect?.({
      walletType: WalletType.Keplr,
      doLogin: false,
    });
  }, [connect]);

  useEffect(() => {
    if (shouldRedirectToCreateOrg && isConnected) {
      setShouldRedirectToCreateOrg(false);
      router.push('/organizations/create');
    }
  }, [
    shouldRedirectToCreateOrg,
    isConnected,
    router,
    setShouldRedirectToCreateOrg,
  ]);

  return {
    modalState,
    walletsUiConfig,
    createOrganization,
    finishOrgCreation,
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    unfinalizedOrgName,
    isConnectWalletModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
  };
};
