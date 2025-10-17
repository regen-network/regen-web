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

type AssignmentNode = {
  visible?: boolean | null;
  daoByDaoAddress?: Maybe<{
    address?: Maybe<string>;
    organizationByDaoAddress?: Maybe<{
      name?: Maybe<string>;
    }>;
  }>;
};

type AccountWithAssignments = AccountFieldsFragment & {
  assignmentsByAccountId?: Maybe<{
    nodes?: Maybe<Array<Maybe<AssignmentNode>>>;
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
    const assignments =
      (activeAccount as AccountWithAssignments | undefined)
        ?.assignmentsByAccountId?.nodes ?? ([] as Array<Maybe<AssignmentNode>>);
    if (assignments.length === 0) return undefined;

    const visibleAssignment = assignments.find(
      assignment =>
        assignment?.visible &&
        assignment.daoByDaoAddress?.address &&
        assignment.daoByDaoAddress?.organizationByDaoAddress?.name,
    );

    const daoAddress = visibleAssignment?.daoByDaoAddress?.address;
    if (!daoAddress) return undefined;

    const organizationName =
      visibleAssignment?.daoByDaoAddress?.organizationByDaoAddress?.name ??
      _(DEFAULT_NAME);

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
