import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { ProjectsIcon } from 'web-components/src/components/icons/ProjectsIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
import { ShoppingCartIcon } from 'web-components/src/components/icons/ShoppingCartIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';

import { NOT_SUPPORTED_TOOLTIP_TEXT } from 'pages/Dashboard/MyProjects/MyProjects.constants';

import { DashboardNavigationSection } from './DashboardNavigation.types';

export const getDashboardNavigationSections = ({
  showOrders,
  loginDisabled,
}: {
  showOrders?: boolean;
  loginDisabled?: boolean;
}): DashboardNavigationSection[] => {
  const sections: DashboardNavigationSection[] = [
    {
      heading: i18n._(msg`Manage credits`),
      items: [
        {
          label: i18n._(msg`Portfolio`),
          icon: (
            <span className="text-[24px] leading-none">
              <CreditsIcon linearGradient disabled={loginDisabled} />
            </span>
          ),
          path: '/portfolio',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
        {
          label: i18n._(msg`Sell`),
          icon: <ShoppingCartIcon linearGradient disabled={loginDisabled} />,
          path: '/sell',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
      ],
    },
    {
      heading: i18n._(msg`Manage projects`),
      items: [
        {
          label: i18n._(msg`Projects`),
          icon: <ProjectsIcon linearGradient disabled={loginDisabled} />,
          path: '/projects',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
      ],
    },
    {
      heading: i18n._(msg`Profile`),
      items: [
        {
          label: i18n._(msg`Edit user profile`),
          icon: <UserMenuIcon linearGradient disabled={loginDisabled} />,
          path: '/profile',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
        {
          label: i18n._(msg`Settings`),
          icon: <CogIcon linearGradient disabled={loginDisabled} />,
          path: '/settings',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
      ],
    },
  ];

  if (showOrders) {
    sections.splice(2, 0, {
      heading: i18n._(msg`Orders`),
      items: [
        {
          label: i18n._(msg`My orders`),
          icon: <ShoppingBagIcon linearGradient />,
          path: '/orders',
        },
      ],
    });
  }

  return sections;
};

export const isSelected = (path: string, location: string) =>
  path === location.substring(location.lastIndexOf('/') + 1);
