import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { LogOutIcon } from 'web-components/src/components/icons/LogOutIcon';
import { MembersIcon } from 'web-components/src/components/icons/MembersIcon';
import { OrgProfileIcon } from 'web-components/src/components/icons/OrgProfileIcon';
import { ProjectsIcon } from 'web-components/src/components/icons/ProjectsIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
import { ShoppingCartIcon } from 'web-components/src/components/icons/ShoppingCartIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';

import { NOT_SUPPORTED_TOOLTIP_TEXT } from 'pages/Dashboard/MyProjects/MyProjects.constants';

import { DashboardNavigationSection } from './DashboardNavigation.types';

// Helper to wrap icons consistently
const wrapIcon = (Icon: React.FC<any>, props: any = {}) => (
  <span className="text-[24px] leading-none">
    <Icon fontSize="inherit" linearGradient {...props} />
  </span>
);

// Get credits section
const getCreditsSection = (
  loginDisabled: boolean,
  collapsed: boolean,
): DashboardNavigationSection => ({
  // Direct translation for headings
  heading: collapsed ? i18n._(msg`Credits`) : i18n._(msg`Manage credits`),
  items: [
    {
      label: i18n._(msg`Portfolio`),
      icon: wrapIcon(CreditsIcon, { disabled: loginDisabled }),
      path: 'portfolio',
    },
    {
      label: i18n._(msg`Sell`),
      icon: <ShoppingCartIcon linearGradient disabled={loginDisabled} />,
      path: 'sell',
      disabled: loginDisabled,
      disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
    },
  ],
});

// Get projects section
const getProjectsSection = (
  loginDisabled: boolean,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? i18n._(msg`Projects`) : i18n._(msg`Manage projects`),
  items: [
    {
      label: i18n._(msg`Projects`),
      icon: <ProjectsIcon linearGradient disabled={loginDisabled} />,
      path: 'projects',
      disabled: loginDisabled,
      disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
    },
  ],
});

// Get user-specific sections
const getUserSections = (
  loginDisabled: boolean,
): DashboardNavigationSection[] => [
  {
    heading: i18n._(msg`Orders`),
    items: [
      {
        label: i18n._(msg`My orders`),
        icon: <ShoppingBagIcon linearGradient />,
        path: 'orders',
      },
    ],
  },
  {
    heading: i18n._(msg`Profile`),
    items: [
      {
        label: i18n._(msg`Edit personal profile`),
        icon: <UserMenuIcon linearGradient disabled={loginDisabled} />,
        path: 'profile',
        disabled: loginDisabled,
        disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
      },
      {
        label: i18n._(msg`Settings`),
        icon: <CogIcon linearGradient disabled={loginDisabled} />,
        path: 'settings',
        disabled: loginDisabled,
        disabledTooltipText: i18n._(NOT_SUPPORTED_TOOLTIP_TEXT),
      },
    ],
  },
];

// Get org-specific sections
const getOrgSection = (collapsed: boolean): DashboardNavigationSection => ({
  // Direct translation instead of using getResponsiveHeading
  heading: collapsed ? i18n._(msg`Org`) : i18n._(msg`Manage organization`),
  items: [
    {
      label: i18n._(msg`Edit org profile`),
      icon: <OrgProfileIcon linearGradient />,
      path: 'profile',
    },
    {
      label: i18n._(msg`Members`),
      icon: <MembersIcon linearGradient />,
      path: 'members',
    },
  ],
});

// Get logout section (always the same)
const getLogoutSection = (): DashboardNavigationSection => ({
  heading: '', // Empty heading doesn't need translation
  items: [
    {
      label: i18n._(msg`Log out`),
      icon: (
        <span className="flex h-30 w-30 shrink-0 items-center justify-center">
          <LogOutIcon linearGradient />
        </span>
      ),
      path: 'logout',
    },
  ],
});

// Main export function
export function getDashboardNavigationSections(
  accountType: 'user' | 'org',
  loginDisabled = false,
  collapsed = false,
): DashboardNavigationSection[] {
  const sections = [
    getCreditsSection(loginDisabled, collapsed),
    getProjectsSection(loginDisabled, collapsed),
  ];

  if (accountType === 'user') {
    sections.push(...getUserSections(loginDisabled));
  } else {
    sections.push(getOrgSection(collapsed));
  }

  sections.push(getLogoutSection());

  return sections;
}
