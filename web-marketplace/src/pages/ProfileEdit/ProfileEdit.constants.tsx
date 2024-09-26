import { msg } from '@lingui/macro';

import { ProfileVariant } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';

import { AccountType } from 'generated/graphql';

export const PROFILE = msg`Profile`;
export const VIEW_PROFILE = msg`View Profile`;
export const PROFILE_SAVED = msg`Profile Saved`;

export const DEFAULT_PROFILE_TYPE = AccountType.User;
export const DEFAULT_NAME = msg`Unnamed`;
export const DEFAULT_PROFILE_BG = '/jpg/profile-default-bg.jpg';
export const DEFAULT_PROFILE_USER_AVATAR = '/svg/profile-default-avatar.svg';
export const DEFAULT_PROFILE_COMPANY_AVATAR =
  '/svg/profile-default-company.svg';

export const PROFILE_S3_PATH = 'profiles';

export const DEFAULT_PROFILE_AVATARS = [
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
];

export const profileVariantMapping: Record<AccountType, ProfileVariant> = {
  ORGANIZATION: 'organization',
  USER: 'individual',
};
