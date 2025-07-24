import { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';

import { ProfileVariant } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';

import { AccountType } from 'generated/graphql';

import defaultProfileBg from '../../../public/jpg/profile-default-bg.jpg';
import defaultProfileAvatar from '../../../public/svg/profile-default-avatar.svg';
import defaultProfileCompany from '../../../public/svg/profile-default-company.svg';

export const PROFILE = msg`Profile`;
export const VIEW_PROFILE = msg`View Public Profile`;
export const VIEW_PUBLIC_PROFILE = msg`View On Personal Profile`;
export const VIEW_ORG_PROFILE = msg`View On Org Profile`;
export const PROFILE_SAVED = msg`Profile Saved`;
export const BRIDGE = msg`Bridge`;
export const PORTFOLIO = msg`Portfolio`;
export const PERSONAL_ACCOUNT = msg`Personal Account`;
export const PERSONAL_DASHBOARD = msg`Personal Dashboard`;
export const NO_ACTIVE_ACCOUNT = msg`No active account`;

export const PORTFOLIO_TABS_ARIA_LABEL = msg`Portfolio tabs`;
export const OPEN_MENU = msg`Open menu`;
export const CLOSE_MENU = msg`Close menu`;
export const DASHBOARD_NAVIGATION_ARIA_LABEL = msg`Dashboard side navigation`;

export const DEFAULT_PROFILE_TYPE = AccountType.User;
export const DEFAULT_NAME = msg`Unnamed`;
export const DEFAULT_PROFILE_BG = defaultProfileBg.src;
export const DEFAULT_PROFILE_USER_AVATAR = defaultProfileAvatar;
export const DEFAULT_PROFILE_COMPANY_AVATAR = defaultProfileCompany;

export const PROFILE_S3_PATH = 'profiles';

export const DEFAULT_PROFILE_AVATARS = [
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
];

export const profileVariantMapping: Record<AccountType, ProfileVariant> = {
  ORGANIZATION: 'organization',
  USER: 'individual',
};

export const DEFAULT_TOKEN_ERROR = msg`Failed to validate token`;
export const TOKEN_ERROR_MSGS: Record<string, MessageDescriptor> = {
  'token.invalid': msg`Invalid token`,
  'token.expired': msg`Token expired`,
};
export const EMAIL_ADDED = msg`Log in email successfully added`;
