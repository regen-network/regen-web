import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { useOrganizationProgress } from 'legacy-pages/CreateOrganization/hooks/useOrganizationProgress';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';

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

  const organization = useDaoOrganization();

  const menuOrganizationProfile = useMemo(() => {
    const daoAddress = organization?.address;
    if (!daoAddress) return undefined;

    const organizationName =
      organization?.organizationByDaoAddress?.name ?? _(DEFAULT_NAME);

    return {
      id: daoAddress,
      name: organizationName,
      profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
      truncatedAddress: getAddress({ walletAddress: daoAddress }),
      address: daoAddress,
      profileLink: `/profiles/${daoAddress}`,
      dashboardLink: '/dashboard',
    };
  }, [_, organization]);

  const defaultAvatar = getDefaultAvatar(activeAccount);

  return {
    defaultAvatar,
    menuOrganizationProfile,
    unfinalizedOrgCreation,
  };
};
