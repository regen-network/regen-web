import { Account, AccountType, Maybe } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from './ProfileEdit.constants';

export const getDefaultAvatar = (account?: Maybe<Pick<Account, 'type'>>) => {
  const isOrganization = account?.type === AccountType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return defaultAvatar;
};
