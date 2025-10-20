import { useMemo } from 'react';
import { useLingui } from '@lingui/react';

import type { AccountFieldsFragment, Maybe } from 'generated/graphql';
import type { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import { useOrganizationProgress } from 'lib/storage/organizationProgress.storage';
import type { Wallet } from 'lib/wallet/wallet';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';

import { getAddress, getProfile } from '../RegistryLayout.utils';

type UseOrganizationMenuProfileParams = {
  activeAccount: Maybe<AccountFieldsFragment> | undefined;
  privActiveAccount: PrivateAccount | undefined;
  wallet: Wallet | null | undefined;
  profileLink: string;
  dashboardLink: string;
};

type DaoAssignmentNode = {
  visible?: boolean | null;
  accountId?: Maybe<string>;
};

type DaoNode = {
  address?: Maybe<string>;
  organizationByDaoAddress?: Maybe<{
    name?: Maybe<string>;
  }>;
  assignmentsByDaoAddress?: Maybe<{
    nodes?: Maybe<Array<Maybe<DaoAssignmentNode>>>;
  }>;
};

type AccountWithDaoAssignments = AccountFieldsFragment & {
  daosByAssignmentAccountIdAndDaoAddress?: Maybe<{
    nodes?: Maybe<Array<Maybe<DaoNode>>>;
  }>;
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

  const organizationProfile = useMemo(
    () =>
      activeAccount?.type === 'ORGANIZATION'
        ? getProfile({
            account: activeAccount,
            privActiveAccount,
            _: _,
            profileLink,
            dashboardLink,
            address: wallet?.address,
          })
        : undefined,
    [
      activeAccount,
      privActiveAccount,
      _,
      profileLink,
      dashboardLink,
      wallet?.address,
    ],
  );

  const unfinishedEntry = useMemo(
    () => organizationProgress,
    [organizationProgress],
  );

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
      (activeAccount as AccountWithDaoAssignments | undefined)
        ?.daosByAssignmentAccountIdAndDaoAddress?.nodes ??
      ([] as Array<Maybe<DaoNode>>);
    if (daos.length === 0) return undefined;

    const findAccountAssignment = (dao?: Maybe<DaoNode>) => {
      if (!dao) return undefined;
      const assignments =
        dao.assignmentsByDaoAddress?.nodes ??
        ([] as Array<Maybe<DaoAssignmentNode>>);
      return assignments.find(assignment => {
        if (!activeAccount?.id) return assignment?.visible;
        return assignment?.accountId === activeAccount.id;
      });
    };

    const visibleDao = daos.find(dao => {
      if (!dao?.address || !dao.organizationByDaoAddress?.name) return false;
      const assignment = findAccountAssignment(dao);
      return assignment?.visible ?? false;
    });

    const daoToUse =
      visibleDao ??
      daos.find(dao => {
        if (!dao?.address || !dao.organizationByDaoAddress?.name) return false;
        return Boolean(findAccountAssignment(dao));
      });

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
  };
};
