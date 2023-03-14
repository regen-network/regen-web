import { ProfileVariant } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';

import { PartyType } from 'generated/graphql';

export const DEFAULT_PROFILE_BG = '/jpg/profile-default-bg.jpg';
export const DEFAULT_PROFILE_AVATAR = '/jpg/profile-default-avatar.jpg';

export const profileVVariantMapping: Record<PartyType, ProfileVariant> = {
  ORGANIZATION: 'organization',
  USER: 'individual',
};
