import { RadioCardItem } from 'web-components/lib/components/atoms/RadioCard/RadioCard.types';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import UserIcon from 'web-components/lib/components/icons/UserIcon';

import { PartyType } from 'generated/graphql';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_TYPE,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

import { EditProfileFormSchemaType } from './EditProfileForm.schema';

export const editProfileFormInitialValues: EditProfileFormSchemaType = {
  profileType: DEFAULT_PROFILE_TYPE,
  name: DEFAULT_NAME,
  profileImage: DEFAULT_PROFILE_USER_AVATAR,
  backgroundImage: DEFAULT_PROFILE_BG,
  description: '',
  twitterLink: '',
  websiteLink: '',
};

export const radioCardItems: RadioCardItem[] = [
  {
    id: 'individual',
    label: 'Individual',
    value: PartyType.User,
    icon: <UserIcon />,
  },
  {
    id: 'organization',
    label: 'Organization',
    value: PartyType.Organization,
    icon: <OrganizationIcon />,
  },
];

export const PROFILE_TYPE = 'Profile type';
export const UPLOAD_IMAGE = 'Upload image';
export const SAVE = 'Save';
export const PROFILE_BG_ASPECT_RATIO = 4;
export const LINKS_LABEL = 'Links';
export const WEBSITE_PLACEHOLDER = 'yourwebsite.com';
export const TWITTER_PLACEHOLDER = 'yourtwitterhandle';
export const PROFILE_AVATAR_FILE_NAME = 'avatar';
export const PROFILE_BG_FILE_NAME = 'bg';
