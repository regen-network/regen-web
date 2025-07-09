import { useEffect } from 'react';

import { AccountType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';

type Params = {
  profileType: AccountType;
  profileImage: string;
  setProfileImage: (value: string) => void;
};

export const useUpdateDefaultAvatar = ({
  setProfileImage,
  profileImage,
  profileType,
}: Params) => {
  useEffect(() => {
    const isOrganization = profileType === AccountType.Organization;
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
