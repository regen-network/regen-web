import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { useOrganizationProgress } from 'legacy-pages/CreateOrganization/hooks/useOrganizationProgress';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import type { AccountByIdQuery } from 'generated/graphql';
import type { Wallet } from 'lib/wallet/wallet';

import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { getAddress } from '../RegistryLayout.utils';

type UseOrganizationMenuProfileParams = {
  activeAccount: AccountByIdQuery['accountById'];
  wallet: Wallet | null | undefined;
};

export const useOrganizationMenuProfile = ({
  activeAccount,
  wallet,
}: UseOrganizationMenuProfileParams) => {
  const { _ } = useLingui();
  const organizationProgress = useOrganizationProgress();
  const walletAddress = wallet?.address;

  const unfinishedEntry = useMemo(() => {
    if (!organizationProgress) return undefined;
    const storedWallet = organizationProgress.walletAddress;
    if (!storedWallet) return undefined;
    if (!walletAddress) return undefined;
    return storedWallet === walletAddress ? organizationProgress : undefined;
  }, [organizationProgress, walletAddress]);

  const unfinalizedOrgCreation = !!unfinishedEntry;
  const unfinalizedOrgName = unfinishedEntry?.name;

  const organizationDao = useDaoOrganization();
  const organizationProfile = organizationDao?.organizationByDaoAddress;

  const menuOrganizationProfile = useMemo(() => {
    if (!organizationProfile || !organizationDao) return undefined;

    const daoAddress = organizationDao.address;
    const organizationName =
      organizationProfile.name?.trim() || _(DEFAULT_NAME);

    const organizationImage =
      organizationProfile?.image?.trim() || DEFAULT_PROFILE_COMPANY_AVATAR;

    return {
      id: daoAddress,
      name: organizationName,
      profileImage: organizationImage,
      truncatedAddress: getAddress({ walletAddress: daoAddress }),
      address: daoAddress,
      profileLink: `/profiles/${daoAddress}`,
      dashboardLink: '/dashboard/organization',
    };
  }, [_, organizationDao, organizationProfile]);

  return {
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    unfinalizedOrgName,
  };
};
