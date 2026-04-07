import { useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  dashboardConnectWalletFlowAtom,
  shouldRedirectToCreateOrgAtom,
} from 'legacy-pages/Dashboard/Dashboard.store';
import { useRouter } from 'next/navigation';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { useLoginData } from '../../LoginButton/hooks/useLoginData';
import { useOrganizationMenuProfile } from './useOrganizationMenuProfile';

export const useOrganizationActions = () => {
  const { activeAccount, privActiveAccount } = useAuth();
  const { wallet, connect, isConnected } = useWallet();
  const {
    modalState,
    onButtonClick: openConnectWalletModal,
    onModalClose,
    walletsUiConfig,
    isModalOpen,
  } = useLoginData({});

  const [shouldRedirectToCreateOrg, setShouldRedirectToCreateOrg] = useAtom(
    shouldRedirectToCreateOrgAtom,
  );
  const setShouldResumeConnectWalletFlow = useSetAtom(
    dashboardConnectWalletFlowAtom,
  );

  const clearConnectWalletFlow = useCallback(() => {
    setShouldResumeConnectWalletFlow(false);
  }, [setShouldResumeConnectWalletFlow]);

  const {
    menuOrganizationProfile,
    menuOrganizationProfiles,
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
      openConnectWalletModal();
    } else if (isConnected) {
      router.push('/organizations/create');
    }
  }, [
    router,
    privActiveAccount,
    isConnected,
    openConnectWalletModal,
    setShouldRedirectToCreateOrg,
  ]);

  const finishOrgCreation = useCallback(() => {
    router.push('/organizations/create');
  }, [router]);

  const handleConnectWalletModalClose = useCallback(() => {
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
    menuOrganizationProfiles,
    unfinalizedOrgCreation,
    unfinalizedOrgName,
    isConnectWalletModalOpen: isModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
    clearConnectWalletFlow,
    openConnectWalletModal,
  };
};
