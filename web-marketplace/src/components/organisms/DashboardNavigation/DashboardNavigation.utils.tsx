import type { ComponentType, ReactElement, SVGProps } from 'react';
import { msg } from '@lingui/macro';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { LogOutIcon } from 'web-components/src/components/icons/LogOutIcon';
import { MembersIcon } from 'web-components/src/components/icons/MembersIcon';
import { OrgProfileIcon } from 'web-components/src/components/icons/OrgProfileIcon';
import { ProjectsIcon } from 'web-components/src/components/icons/ProjectsIcon';
import { ShoppingBagIcon } from 'web-components/src/components/icons/ShoppingBagIcon';
import { ShoppingCartIcon } from 'web-components/src/components/icons/ShoppingCartIcon';
import { UserMenuIcon } from 'web-components/src/components/icons/UserMenuIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { NOT_SUPPORTED_TOOLTIP_TEXT } from 'pages/Dashboard/MyProjects/MyProjects.constants';

import {
  DashboardNavigationSection,
  GradientProps,
} from './DashboardNavigation.types';

export function wrapIcon<
  P extends SVGProps<SVGSVGElement> = SVGProps<SVGSVGElement>,
>(
  Icon: ComponentType<P & GradientProps>,
  props?: Omit<P, keyof GradientProps>,
): ReactElement {
  return (
    <span className="text-[24px] leading-none">
      <Icon fontSize="inherit" linearGradient {...(props as P)} />
    </span>
  );
}

const getCreditsSection = (
  _: TranslatorType,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? _(msg`Credits`) : _(msg`Manage credits`),
  items: [
    {
      label: _(msg`Portfolio`),
      icon: wrapIcon(CreditsIcon),
      path: 'portfolio',
    },
    {
      label: _(msg`Sell`),
      icon: <ShoppingCartIcon linearGradient />,
      path: 'sell',
    },
  ],
});

const getProjectsSection = (
  _: TranslatorType,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? _(msg`Projects`) : _(msg`Manage projects`),
  items: [
    {
      label: _(msg`Projects`),
      icon: <ProjectsIcon linearGradient />,
      path: 'projects',
    },
  ],
});

const getUserSections = (
  _: TranslatorType,
  loginDisabled: boolean,
): DashboardNavigationSection[] => [
  {
    heading: _(msg`Profile`),
    items: [
      {
        label: _(msg`Edit personal profile`),
        icon: <UserMenuIcon linearGradient disabled={loginDisabled} />,
        path: 'profile',
        disabled: loginDisabled,
        disabledTooltipText: _(NOT_SUPPORTED_TOOLTIP_TEXT),
      },
      {
        label: _(msg`Settings`),
        icon: <CogIcon linearGradient disabled={loginDisabled} />,
        path: 'settings',
        disabled: loginDisabled,
        disabledTooltipText: _(NOT_SUPPORTED_TOOLTIP_TEXT),
      },
    ],
  },
];

const getOrgSection = (
  _: TranslatorType,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? _(msg`Org`) : _(msg`Manage organization`),
  items: [
    {
      label: _(msg`Edit org profile`),
      icon: <OrgProfileIcon linearGradient />,
      path: 'profile',
    },
    {
      label: _(msg`Members`),
      icon: <MembersIcon linearGradient />,
      path: 'members',
    },
  ],
});

const getLogoutSection = (_: TranslatorType): DashboardNavigationSection => ({
  heading: '',
  items: [
    {
      label: _(msg`Log out`),
      icon: (
        <span className="flex h-30 w-30 shrink-0 items-center justify-center">
          <LogOutIcon linearGradient />
        </span>
      ),
      path: 'logout',
    },
  ],
});

const getCreditIssuanceSection = (
  _: TranslatorType,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? _(msg`Issuance`) : _(msg`Credit issuance`),
  items: [
    {
      label: _(msg`Issued credit batches`),
      icon: <CreditBatchIcon linearGradient />,
      path: 'credit-batches',
    },
    {
      label: _(msg`Credit classes`),
      icon: <CreditClassIcon linearGradient />,
      path: 'credit-classes',
    },
  ],
});

const getOrdersSection = (
  _: TranslatorType,
  collapsed: boolean,
): DashboardNavigationSection => ({
  heading: collapsed ? _(msg`Orders`) : _(msg`Orders`),
  items: [
    {
      label: _(msg`Orders`),
      icon: <ShoppingBagIcon linearGradient />,
      path: 'my-orders',
    },
  ],
});

export function getDashboardNavigationSections(
  _: TranslatorType,
  accountType: 'user' | 'org',
  loginDisabled: boolean,
  collapsed = false,
  isIssuer = false,
  hasWalletAddress = true,
  hasProjects = false,
  hasOrders = true,
  walletConnect = false,
): DashboardNavigationSection[] {
  const sections = [];
  if (hasWalletAddress) {
    sections.push(getCreditsSection(_, collapsed));
  }
  if (
    (walletConnect && hasProjects) ||
    (!walletConnect && !hasProjects) ||
    (!walletConnect && hasProjects)
  ) {
    sections.push(getProjectsSection(_, collapsed));
  }

  if (isIssuer) {
    sections.push(getCreditIssuanceSection(_, collapsed));
  }
  if (hasOrders) {
    sections.push(getOrdersSection(_, collapsed));
  }

  if (accountType === 'user') {
    sections.push(...getUserSections(_, loginDisabled));
  } else {
    sections.push(getOrgSection(_, collapsed));
  }

  sections.push(getLogoutSection(_));

  return sections;
}
