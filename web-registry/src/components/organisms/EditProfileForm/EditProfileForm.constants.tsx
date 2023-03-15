import { RadioCardItem } from 'web-components/lib/components/atoms/RadioCard/RadioCard.types';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import UserIcon from 'web-components/lib/components/icons/UserIcon';

import { EditProfileFormSchemaType } from './EditProfileForm.schema';

export const editProfileFormInitialValues: EditProfileFormSchemaType = {
  profileType: 'individual',
  name: '',
  profileImage: '',
  backgroundImage: '',
  description: '',
};

export const radioCardItems: RadioCardItem[] = [
  {
    id: 'individual',
    label: 'Individual',
    value: 'individual',
    icon: <UserIcon />,
  },
  {
    id: 'organization',
    label: 'Organization',
    value: 'organization',
    icon: <OrganizationIcon />,
  },
];

export const PROFILE_TYPE = 'Profile type';
export const UPLOAD_IMAGE = 'Upload image';
export const SAVE = 'Save';
export const PROFILE_BG_ASPECT_RATIO = 4;
