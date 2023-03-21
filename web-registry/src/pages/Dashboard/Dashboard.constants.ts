import { ProfileVariant } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { PartyType } from 'generated/graphql';

export const DEFAULT_NAME = 'Unnamed';
export const DEFAULT_PROFILE_BG = '/jpg/profile-default-bg.jpg';
export const DEFAULT_PROFILE_USER_AVATAR = '/svg/profile-default-avatar.svg';
export const DEFAULT_PROFILE_COMPANY_AVATAR =
  '/svg/profile-default-company.svg';

export const profileVariantMapping: Record<PartyType, ProfileVariant> = {
  ORGANIZATION: 'organization',
  USER: 'individual',
};
