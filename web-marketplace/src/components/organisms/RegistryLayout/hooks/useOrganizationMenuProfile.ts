import { useMemo } from 'react';
import { useLingui } from '@lingui/react';

import type { AccountByIdQuery, Maybe } from 'generated/graphql';
import type { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import type { Wallet } from 'lib/wallet/wallet';

import { useOrganizationProgress } from 'pages/CreateOrganization/hooks/useOrganizationProgress';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';

import { getAddress, getProfile } from '../RegistryLayout.utils';

type UseOrganizationMenuProfileParams = {
  activeAccount: AccountByIdQuery['accountById'];
  privActiveAccount: PrivateAccount | undefined;
  wallet: Wallet | null | undefined;
  profileLink: string;
  dashboardLink: string;
};

export const useOrganizationMenuProfile = ({
  activeAccount,
  privActiveAccount,
  wallet,
  profileLink,
  dashboardLink,
}: UseOrganizationMenuProfileParams) => {
  const { _ } = useLingui();
  const organizationProgress = useOrganizationProgress();
  const walletAddress = wallet?.address;

  const hasDaoForActiveAccount = useMemo(() => {
    if (activeAccount?.type !== 'ORGANIZATION') return false;

    const daoNodes =
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes ?? [];

    return daoNodes.some(dao => !!dao?.address);
  }, [activeAccount]);

  const organizationProfile = useMemo(() => {
    if (!hasDaoForActiveAccount) return undefined;

    return getProfile({
      account: activeAccount,
      privActiveAccount,
      _: _,
      profileLink,
      dashboardLink,
      address: wallet?.address,
    });
  }, [
    hasDaoForActiveAccount,
    activeAccount,
    privActiveAccount,
    _,
    profileLink,
    dashboardLink,
    wallet?.address,
  ]);

  const unfinishedEntry = useMemo(() => {
    if (!organizationProgress) return undefined;
    const storedWallet = organizationProgress.walletAddress;
    if (!storedWallet) return undefined;
    if (!walletAddress) return undefined;
    return storedWallet === walletAddress ? organizationProgress : undefined;
  }, [organizationProgress, walletAddress]);

  const unfinalizedOrgCreation = !!unfinishedEntry;

  const fallbackOrganizationProfile = useMemo(() => {
    if (!unfinishedEntry) return undefined;
    const fallbackName =
      unfinishedEntry.name && unfinishedEntry.name.trim().length > 0
        ? unfinishedEntry.name
        : _(DEFAULT_NAME);
    return {
      id: unfinishedEntry.daoAddress,
      name: fallbackName,
      profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
      truncatedAddress: getAddress({
        walletAddress: unfinishedEntry.daoAddress,
      }),
      address: unfinishedEntry.daoAddress,
      profileLink: '/organizations/create',
      dashboardLink: '/organizations/create',
    };
  }, [unfinishedEntry, _]);

  const organizationProfileFromAssignments = useMemo(() => {
    const daos =
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes ?? [];
    if (daos.length === 0) return undefined;

    // find the DAO that is an organization
    const daoToUse = daos.find(dao => !!dao?.organizationByDaoAddress);

    const daoAddress = daoToUse?.address;
    if (!daoAddress) return undefined;

    const organizationName =
      daoToUse?.organizationByDaoAddress?.name ?? _(DEFAULT_NAME);

    return {
      id: daoAddress,
      name: organizationName,
      profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
      truncatedAddress: getAddress({ walletAddress: daoAddress }),
      address: daoAddress,
      profileLink: `/profiles/${daoAddress}`,
      dashboardLink: '/dashboard',
    };
  }, [activeAccount, _]);

  const menuOrganizationProfile =
    organizationProfile ??
    fallbackOrganizationProfile ??
    organizationProfileFromAssignments;

  const defaultAvatar = getDefaultAvatar(activeAccount);

  return {
    defaultAvatar,
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    hasDaoForActiveAccount,
  };
};
