import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
// import { EnvelopeIcon } from 'web-components/src/components/icons/EnvelopeIcon';
// import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
// import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';

import { AdminNavigationSection } from './AdminNavigation.types';

export const adminNavigationSections: AdminNavigationSection[] = [
  {
    heading: i18n._(msg`Orders`),
    items: [
      {
        name: i18n._(msg`My orders`),
        icon: <ShoppingBagIcon linearGradient />,
        path: 'my-orders',
      },
      // {
      //   name: i18n._(msg`My prefinance projects`),
      //   icon: <PrefinanceIcon linearGradient width="24" height="24" />,
      //   path: 'my-prefinance-projects',
      // },
      // {
      //   name: i18n._(msg`Saved payment info`),
      //   icon: <PaymentInfoIcon linearGradient />,
      //   path: 'payment-info',
      // },
    ],
  },
  {
    heading: i18n._(msg`Profile`),
    items: [
      {
        name: i18n._(msg`Edit profile`),
        icon: <UserMenuIcon linearGradient />,
        path: 'profile',
      },
      {
        name: i18n._(msg`Settings`),
        icon: <CogIcon linearGradient />,
        path: 'settings',
      },
      // {
      //   name: i18n._(msg`Email updates`),
      //   icon: <EnvelopeIcon linearGradient />,
      //   path: 'email-updates',
      // },
    ],
  },
];
