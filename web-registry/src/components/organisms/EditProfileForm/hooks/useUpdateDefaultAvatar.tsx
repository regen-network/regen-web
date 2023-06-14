import { useEffect } from 'react';

import { PartyType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

type Params = {
  profileType: PartyType;
  profileImage: string;
  setProfileImage: (value: string) => void;
};

export const useUpdateDefaultAvatar = ({
  setProfileImage,
  profileImage,
  profileType,
}: Params) => {
  useEffect(() => {
    const isOrganization = profileType === PartyType.Organization;
    const defaultAvatar = isOrganization
      ? DEFAULT_PROFILE_COMPANY_AVATAR
      : DEFAULT_PROFILE_USER_AVATAR;
    if (
      DEFAULT_PROFILE_AVATARS.includes(profileImage) &&
      defaultAvatar !== profileImage
    ) {
      setProfileImage(defaultAvatar);
    }
  }, [setProfileImage, profileType, profileImage]);
};
