import { RadioCardItem } from 'web-components/src/components/atoms/RadioCard/RadioCard.types';
import OrganizationIcon from 'web-components/src/components/icons/OrganizationIcon';
import UserIcon from 'web-components/src/components/icons/UserIcon';

import { AccountType } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_TYPE,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

import { EditProfileFormSchemaType } from './EditProfileForm.schema';

export const getEditProfileFormInitialValues = (
  _: TranslatorType,
): EditProfileFormSchemaType => ({
  profileType: DEFAULT_PROFILE_TYPE,
  name: _(DEFAULT_NAME),
  profileImage: DEFAULT_PROFILE_USER_AVATAR,
  backgroundImage: DEFAULT_PROFILE_BG,
  description: '',
  twitterLink: '',
  websiteLink: '',
});

export const radioCardItems: RadioCardItem[] = [
  {
    id: 'individual',
    label: 'Individual',
    value: AccountType.User,
    icon: <UserIcon />,
  },
  {
    id: 'organization',
    label: 'Organization',
    value: AccountType.Organization,
    icon: <OrganizationIcon />,
  },
];

export const PROFILE_TYPE = 'Profile type';
export const UPLOAD_IMAGE = 'Upload image';
export const SAVE = 'Save';
export const PROFILE_BG_ASPECT_RATIO = 1440 / 326;
export const LINKS_LABEL = 'Links';
export const WEBSITE_PLACEHOLDER = 'https://yourwebsite.com';
export const TWITTER_PLACEHOLDER = 'https://twitter.com/yourtwitterhandle';
export const PROFILE_AVATAR_FILE_NAME = 'avatar';
export const PROFILE_BG_FILE_NAME = 'bg';
