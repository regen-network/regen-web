import { postData } from 'utils/fetch/postData';

import { ProfileVariant } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { AccountType } from 'generated/graphql';
import { apiUri } from 'lib/apiUri';

import { SocialProvider } from './ProfileEdit.types';

export const PROFILE = 'Profile';
export const VIEW_PROFILE = 'View Profile';
export const PROFILE_SAVED = 'Profile Saved';

export const DEFAULT_PROFILE_TYPE = AccountType.User;
export const DEFAULT_NAME = 'Unnamed';
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
