import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';
import { NOT_SUPPORTED_TOOLTIP_TEXT } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
// import { EnvelopeIcon } from 'web-components/src/components/icons/EnvelopeIcon';
// import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
// import { PrefinanceIcon } from 'web-components/src/components/icons/PrefinanceIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';

import {
  AdminNavigationItem,
  AdminNavigationSection,
} from './AdminNavigation.types';

export const getAdminNavigationSections = ({
  showOrders,
  loginDisabled,
}: {
  showOrders?: boolean;
  loginDisabled?: boolean;
}): AdminNavigationSection[] => {
  const sections = [
    {
      heading: i18n._(msg`Profile`),
      items: [
        {
          name: i18n._(msg`Edit profile`),
          icon: <UserMenuIcon linearGradient disabled={loginDisabled} />,
          path: 'profile',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
        {
          name: i18n._(msg`Settings`),
          icon: <CogIcon linearGradient disabled={loginDisabled} />,
          path: 'settings',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
        // {
        //   name: i18n._(msg`Email updates`),
        //   icon: <EnvelopeIcon linearGradient />,
        //   path: 'email-updates',
        // },
      ] as AdminNavigationItem[],
    },
  ];

  if (showOrders) {
    sections.unshift({
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
    });
  }
  return sections;
};

export const isSelected = (path: string, location: string) => {
  return path === location.substring(location.lastIndexOf('/') + 1);
};
