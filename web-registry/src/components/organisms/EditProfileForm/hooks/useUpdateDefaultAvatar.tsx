import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { PartyType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

import { EditProfileFormSchemaType } from '../EditProfileForm.schema';

type Params = {
  profileType: PartyType;
  profileImage: string;
  form: UseFormReturn<EditProfileFormSchemaType>;
};

export const useUpdateDefaultAvatar = ({
  form,
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
      form.setValue('profileImage', defaultAvatar);
    }
  }, [form, profileType, profileImage]);
};
