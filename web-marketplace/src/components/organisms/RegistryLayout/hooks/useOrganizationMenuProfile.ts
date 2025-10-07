import { useMemo } from 'react';

import type { AccountFieldsFragment, Maybe } from 'generated/graphql';
import type { TranslatorType } from 'lib/i18n/i18n.types';
import type { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';
import { useOrganizationProgress } from 'lib/storage/organizationProgress.storage';
import type { Wallet } from 'lib/wallet/wallet';

import { CREATE_ORG_FORM_ID } from 'pages/CreateOrganization/CreateOrganization.constants';
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
  translate: TranslatorType;
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
  translate,
}: UseOrganizationMenuProfileParams) => {
  const organizationProgress = useOrganizationProgress();

  const organizationProfile = useMemo(
    () =>
      activeAccount?.type === 'ORGANIZATION'
        ? getProfile({
            account: activeAccount,
            privActiveAccount,
            _: translate,
            profileLink,
            dashboardLink,
            address: wallet?.address,
          })
        : undefined,
    [
      activeAccount,
      privActiveAccount,
      translate,
      profileLink,
      dashboardLink,
      wallet?.address,
    ],
  );

  const multiStepEntry = useMemo<
    { daoAddress: string; step: number; name?: string } | undefined
  >(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const stored = window.localStorage.getItem(CREATE_ORG_FORM_ID);
      if (!stored) return undefined;
      const parsed = JSON.parse(stored);
      const daoAddress: string | undefined =
        parsed?.formValues?.dao?.daoAddress;
      if (!daoAddress) return undefined;
      const parsedEntry = {
        daoAddress,
        step: parsed?.maxAllowedStep ?? 0,
        name: parsed?.formValues?.name,
      };
      return parsedEntry;
    } catch (error) {
      const PARSE_CREATE_ORG_STORAGE_FAILED =
        'Failed to parse create-organization storage';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const noop = (_msg: string, _err: unknown) => {};
      noop(PARSE_CREATE_ORG_STORAGE_FAILED, error);
      return undefined;
    }
  }, []);

  const unfinishedEntry = useMemo<
    { daoAddress: string; step: number; name?: string } | undefined
  >(() => {
    const firstKey = Object.keys(organizationProgress)[0];
    if (firstKey) {
      return { daoAddress: firstKey, step: organizationProgress[firstKey] };
    }
    return multiStepEntry;
  }, [organizationProgress, multiStepEntry]);

  const unfinalizedOrgCreation = !!unfinishedEntry;

  const fallbackOrganizationProfile = useMemo(() => {
    if (!unfinishedEntry) return undefined;
    const fallbackName =
      unfinishedEntry.name || multiStepEntry?.name || translate(DEFAULT_NAME);
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
  }, [unfinishedEntry, multiStepEntry, translate]);

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
      translate(DEFAULT_NAME);

    return {
      id: daoAddress,
      name: organizationName,
      profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
      truncatedAddress: getAddress({ walletAddress: daoAddress }),
      address: daoAddress,
      profileLink: `/profiles/${daoAddress}`,
      dashboardLink: '/dashboard',
    };
  }, [activeAccount, translate]);

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
