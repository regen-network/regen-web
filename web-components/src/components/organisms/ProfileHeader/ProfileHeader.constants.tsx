import AvatarOutlineIcon from '../../../components/icons/AvatarOutlineIcon';
import OrganizationIcon from '../../../components/icons/OrganizationIcon';
import { ProfileVariant } from './ProfileHeader.types';

export const PROFILE_BG_HEIGHT_DESKTOP = 326;
export const PROFILE_BG_HEIGHT_MOBILE = 140;
export const PROFILE_AVATAR_SIZE_MOBILE = 120;
export const PROFILE_AVATAR_SIZE_TABLET = 150;
export const PROFILE_AVATAR_SIZE_DESKTOP = 200;
export const PROFILE_AVATAR_MARGIN_TOP_MOBILE =
  (PROFILE_BG_HEIGHT_MOBILE - PROFILE_AVATAR_SIZE_MOBILE / 2) / 4;
export const PROFILE_AVATAR_MARGIN_TOP_TABLET =
  (PROFILE_BG_HEIGHT_DESKTOP - PROFILE_AVATAR_SIZE_TABLET / 2) / 4;
export const PROFILE_AVATAR_MARGIN_TOP_DESKTOP =
  (PROFILE_BG_HEIGHT_DESKTOP - PROFILE_AVATAR_SIZE_DESKTOP / 2) / 4;
export const ProfileVariantIconMapping: {
  [key in ProfileVariant]: JSX.Element;
} = {
  individual: <AvatarOutlineIcon />,
  organization: <OrganizationIcon color="currentColor" />,
};
