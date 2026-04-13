import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { useOrganizationProgress } from 'legacy-pages/CreateOrganization/hooks/useOrganizationProgress';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import type { Wallet } from 'lib/wallet/wallet';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

import { getAddress } from '../RegistryLayout.utils';

type useOrganizationMenuProfilesParams = {
  wallet: Wallet | null | undefined;
};

export const useOrganizationMenuProfiles = ({
  wallet,
}: useOrganizationMenuProfilesParams) => {
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

  const organizationDaos = useDaoOrganizations();

  const menuOrganizationProfiles = useMemo(
    () =>
      organizationDaos
        .map(dao => {
          const profile = dao?.organizationByDaoAddress;
          if (!profile || !dao?.address) return null;
          const daoAddress = dao.address;
          return {
            id: daoAddress,
            name: profile.name?.trim() || _(DEFAULT_NAME),
            profileImage:
              profile.image?.trim() || DEFAULT_PROFILE_COMPANY_AVATAR,
            truncatedAddress: getAddress({ walletAddress: daoAddress }),
            address: daoAddress,
            profileLink: `/profiles/${daoAddress}`,
            dashboardLink: `/dashboard/organization/${daoAddress}`,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null),
    [_, organizationDaos],
  );

  return {
    menuOrganizationProfiles,
    unfinalizedOrgCreation,
    unfinalizedOrgName,
  };
};
