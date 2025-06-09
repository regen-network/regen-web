import { Account, AccountType, Maybe } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from './ProfileEdit.constants';

export const getDefaultAvatar = (account: {
  type: 'user' | 'org' | AccountType;
}) => {
  // Handle both string literals and enum values
  const accountType =
    typeof account.type === 'string'
      ? account.type === 'user'
        ? AccountType.User
        : AccountType.Organization
      : account.type;

  const isOrganization = accountType === AccountType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return defaultAvatar;
};

export const getProfileUrl = (account: { addr?: string; id?: string }) => {
  // Use address if available, otherwise fall back to ID
  const identifier = account.addr || account.id;
  return `/profiles/${identifier}`;
};
