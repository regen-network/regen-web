import { msg } from '@lingui/macro';

import { RadioCardItem } from 'web-components/src/components/atoms/RadioCard/RadioCard.types';
import OrganizationIcon from 'web-components/src/components/icons/OrganizationIcon';
import UserIcon from 'web-components/src/components/icons/UserIcon';

import { AccountType } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

export const getRadioCardItems = (_: TranslatorType): RadioCardItem[] => [
  {
    id: 'individual',
    label: _(msg`Individual`),
    value: AccountType.User,
    icon: <UserIcon />,
  },
  {
    id: 'organization',
    label: _(msg`Organization`),
    value: AccountType.Organization,
    icon: <OrganizationIcon />,
  },
];

export const PROFILE_TYPE = msg`Profile type`;
export const UPLOAD_IMAGE = msg`Upload image`;
export const SAVE = msg`Save`;
export const PROFILE_BG_ASPECT_RATIO = 1440 / 326;
export const LINKS_LABEL = msg`Links`;
export const WEBSITE_PLACEHOLDER = 'https://yourwebsite.com';
export const TWITTER_PLACEHOLDER = 'https://twitter.com/yourtwitterhandle';
export const PROFILE_AVATAR_FILE_NAME = 'avatar';
export const PROFILE_BG_FILE_NAME = 'bg';
