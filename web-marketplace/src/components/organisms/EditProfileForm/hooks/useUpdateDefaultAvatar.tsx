import { useEffect, useRef } from 'react';

import { AccountType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';

type Params = {
  profileType?: AccountType;
  profileImage: string;
  setProfileImage: (value: string) => void;
};

const matchesDefaultAvatar = (value: string, defaultPath: string): boolean => {
  if (!value) return false;
  if (value === defaultPath) return true;
  return value.endsWith(defaultPath) || value.includes(defaultPath);
};

export const useUpdateDefaultAvatar = ({
  setProfileImage,
  profileImage,
  profileType,
}: Params) => {
  const previousProfileType = useRef<AccountType | undefined>(profileType);

  useEffect(() => {
    if (!profileType) return;
    const prevType = previousProfileType.current;

    if (!prevType) {
      previousProfileType.current = profileType;
      return;
    }

    if (prevType === profileType) {
      return;
    }

    previousProfileType.current = profileType;

    if (
      prevType === AccountType.User &&
      profileType === AccountType.Organization &&
      matchesDefaultAvatar(profileImage, DEFAULT_PROFILE_USER_AVATAR)
    ) {
      setProfileImage(DEFAULT_PROFILE_COMPANY_AVATAR);
      return;
    }

    if (
      prevType === AccountType.Organization &&
      profileType === AccountType.User &&
      matchesDefaultAvatar(profileImage, DEFAULT_PROFILE_COMPANY_AVATAR)
    ) {
      setProfileImage(DEFAULT_PROFILE_USER_AVATAR);
    }
  }, [profileType, profileImage, setProfileImage]);
};
