import React from 'react';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { ProjectsIcon } from 'web-components/src/components/icons/ProjectsIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
import { ShoppingCartIcon } from 'web-components/src/components/icons/ShoppingCartIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';
import MembersIcon from 'web-components/src/components/icons/MembersIcon';
import OrgProfile from 'web-components/src/components/icons/OrgProfile';
import LogoutIconGreen from 'web-components/src/components/icons/LogoutIconGreen';

import { NOT_SUPPORTED_TOOLTIP_TEXT } from 'pages/Dashboard/MyProjects/MyProjects.constants';
import { DashboardNavigationSection } from './DashboardNavigation.types';

export function getDashboardNavigationSections(
  accountType: 'user' | 'org',
  loginDisabled = false,
  collapsed = false // Add collapsed parameter
): DashboardNavigationSection[] {
  const baseSections: DashboardNavigationSection[] = [
    {
      // Use shortened heading when collapsed
      heading: collapsed ? i18n._(msg`Credits`) : i18n._(msg`Manage credits`),
      items: [
        {
          label: i18n._(msg`Portfolio`),
          icon: (
            <span className="text-[24px] leading-none">
              <CreditsIcon
                fontSize="inherit"
                linearGradient
                disabled={loginDisabled}
              />
            </span>
          ),
          path: '/portfolio',
        },
        {
          label: i18n._(msg`Sell`),
          icon: (
            <ShoppingCartIcon linearGradient disabled={loginDisabled} />
          ),
          path: '/sell',
          disabled: loginDisabled,
          disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
        },
      ],
    },
    {
      // Use shortened heading when collapsed
      heading: collapsed ? i18n._(msg`Projects`) : i18n._(msg`Manage projects`),
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
  ];

  let sections: DashboardNavigationSection[];

  if (accountType === 'user') {
    sections = [
      ...baseSections,
      {
        heading: i18n._(msg`Orders`),
        items: [
          {
            label: i18n._(msg`My orders`),
            icon: <ShoppingBagIcon linearGradient />,
            path: '/orders',
          },
        ],
      },
      {
        heading: i18n._(msg`Profile`),
        items: [
          {
            label: i18n._(msg`Edit user profile`),
            icon: (
              <UserMenuIcon linearGradient disabled={loginDisabled} />
            ),
            path: '/profile',
            disabled: loginDisabled,
            disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
          },
          {
            label: i18n._(msg`Settings`),
            icon: (
              <CogIcon linearGradient disabled={loginDisabled} />
            ),
            path: '/settings',
            disabled: loginDisabled,
            disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
          },
        ],
      },
    ];
  } else {
    sections = [
      ...baseSections,
      {
        // Use shortened heading when collapsed
        heading: collapsed ? i18n._(msg`Org`) : i18n._(msg`Manage organization`),
        items: [
          {
            label: i18n._(msg`Edit org profile`),
            icon: <OrgProfile linearGradient />,
            path: '/org/settings',
          },
          {
            label: i18n._(msg`Members`),
            icon: <MembersIcon linearGradient />,
            path: '/org/members',
          },
        ],
      },
    ];
  }

  // finally append the Log out button as its own “section”
  sections.push({
    heading: '',
    items: [
      {
        label: i18n._(msg`Log out`),
        icon: (
          <span className="flex h-30 w-30 shrink-0 items-center justify-center">
            <LogoutIconGreen className="h-full w-full" />
          </span>
        ),
        path: '/logout',
      },
    ],
  });

  return sections;
}
