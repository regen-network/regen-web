import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { EnvelopeIcon } from 'web-components/src/components/icons/EnvelopeIcon';
import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';
import { ProfileVariant } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.types';

import { AccountType } from 'generated/graphql';

import { DashboardNavSection } from './ProfileEdit.types';

export const PROFILE = msg`Profile`;
export const VIEW_PROFILE = msg`View Profile`;
export const PROFILE_SAVED = msg`Profile Saved`;

export const DEFAULT_PROFILE_TYPE = AccountType.User;
export const DEFAULT_NAME = msg`Unnamed`;
export const DEFAULT_PROFILE_BG = '/jpg/profile-default-bg.jpg';
export const DEFAULT_PROFILE_USER_AVATAR = '/svg/profile-default-avatar.svg';
export const DEFAULT_PROFILE_COMPANY_AVATAR =
  '/svg/profile-default-company.svg';

export const PROFILE_S3_PATH = 'profiles';

export const DEFAULT_PROFILE_AVATARS = [
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
];

export const profileVariantMapping: Record<AccountType, ProfileVariant> = {
  ORGANIZATION: 'organization',
  USER: 'individual',
};

export const dashboardNavSections: DashboardNavSection[] = [
  {
    heading: msg`Orders`,
    items: [
      {
        name: msg`My Orders`,
        icon: <ShoppingBagIcon linearGradient />,
        href: '/profile/edit/orders',
      },
      {
        name: msg`My prefinance projects`,
        icon: <PrefinanceIcon linearGradient width="24" height="24" />,
        href: '/profile/edit/prefinance-projects',
      },
      {
        name: msg`Saved payment info`,
        icon: <PaymentInfoIcon linearGradient />,
        href: '/profile/edit/payment-info',
      },
    ],
  },
  {
    heading: msg`Profile`,
    items: [
      {
        name: msg`Edit Profile`,
        icon: <UserMenuIcon linearGradient />,
        href: '/profile/edit/profile',
      },
      {
        name: msg`Settings`,
        icon: <CogIcon linearGradient />,
        href: '/profile/edit/settings',
      },
      {
        name: msg`Email updates`,
        icon: <EnvelopeIcon linearGradient />,
        href: '/profile/email-updates',
      },
    ],
  },
];
