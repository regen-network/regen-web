import { Maybe, Party, PartyType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from './ProfileEdit.constants';

export const getDefaultAvatar = (party?: Maybe<Pick<Party, 'type'>>) => {
  const isOrganization = party?.type === PartyType.Organization;
  const defaultAvatar = isOrganization
    ? DEFAULT_PROFILE_COMPANY_AVATAR
    : DEFAULT_PROFILE_USER_AVATAR;

  return defaultAvatar;
};
