import { Theme } from '@mui/material';

import { HeaderColors } from 'web-components/src/components/header';
import { HeaderDropdownItemProps } from 'web-components/src/components/header/components/HeaderDropdown/HeaderDropdown.Item';
import { Item } from 'web-components/src/components/header/components/HeaderMenuItem/HeaderMenuItem';
import { NavLinkProps } from 'web-components/src/components/header/components/NavLink';
import {
  UserMenuItemProfile,
  UserMenuItemProfileProps,
} from 'web-components/src/components/header/components/UserMenuItem.Profile';
import { OnProfileClickType } from 'web-components/src/components/header/components/UserMenuItem.types';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { isBridgeEnabled } from 'lib/ledger';

import {
  BRIDGE,
  CREDIT_BATCHES,
  CREDIT_CLASSES,
  EDIT_PROFILE,
  PORTFOLIO,
  PROFILE_SETTINGS,
  PROJECTS,
  SEPARATOR,
} from 'pages/Dashboard/Dashboard.constants';
import { Link } from 'components/atoms';

export const getMenuItems = (pathname: string): Item[] => [
  {
    title: 'NCT',
    href: '/baskets/eco.uC.NCT',
  },
  {
    title: 'Projects',
    dropdownItems: [
      {
        pathname,
        href: '/projects/1',
        label: 'All projects',
        linkComponent: Link,
        importCallback: (): Promise<any> =>
          import('../../../pages/Projects/AllProjects'),
      },
      {
        pathname,
        href: '/projects/prefinance',
        label: 'Prefinance projects',
        linkComponent: Link,
        importCallback: (): Promise<any> =>
          import('../../../pages/Projects/PrefinanceProjects'),
      },
    ],
  },
  {
    title: 'Trade',
    href: '/storefront',
  },
  {
    title: 'Stats',
    dropdownItems: [
      {
        pathname,
        href: '/stats/activity',
        label: 'Activity',
        linkComponent: Link,
        importCallback: (): Promise<any> => import('../../../pages/Activity'),
      },
      {
        pathname,
        href: '/ecocredit-batches/1',
        label: 'Ecocredit batches',
        linkComponent: Link,
        importCallback: (): Promise<any> =>
          import('../../../pages/EcocreditBatches'),
      },
    ],
  },
];

interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
  showCreditClasses?: boolean;
  isIssuer?: boolean;
  showProjects?: boolean;
  isWalletConnected: boolean;
  loginDisabled: boolean;
  profile?: UserMenuItemProfileProps;
  _: TranslatorType;
  onProfileClick?: OnProfileClickType;
}

export const getUserMenuItems = ({
  linkComponent,
  pathname,
  showCreditClasses,
  isIssuer,
  showProjects,
  isWalletConnected,
  loginDisabled,
  profile,
  _,
  onProfileClick,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] =>
  [
    profile && {
      children: (
        <UserMenuItemProfile {...profile} onProfileClick={onProfileClick} />
      ),
    },
    isWalletConnected && {
      pathname,
      linkComponent,
      importCallback: (): Promise<any> => import('../../../pages/Dashboard'),
      ...PORTFOLIO,
      label: _(PORTFOLIO.label),
      icon: <CreditsIcon sx={{ width: 24, height: 20 }} linearGradient />,
    },
    showProjects && {
      pathname,
      linkComponent,
      ...PROJECTS,
      label: _(PROJECTS.label),
    },
    showCreditClasses && {
      pathname,
      linkComponent,
      ...CREDIT_CLASSES,
      label: _(CREDIT_CLASSES.label),
    },
    isIssuer && {
      pathname,
      linkComponent,
      ...CREDIT_BATCHES,
      label: _(CREDIT_BATCHES.label),
    },
    isWalletConnected &&
      isBridgeEnabled && {
        pathname,
        linkComponent,
        ...BRIDGE,
        label: _(BRIDGE.label),
      },
    !loginDisabled && {
      ...SEPARATOR,
    },
    !loginDisabled && {
      pathname,
      linkComponent,
      ...EDIT_PROFILE,
      label: _(EDIT_PROFILE.label),
    },
    !loginDisabled && {
      pathname,
      linkComponent,
      ...PROFILE_SETTINGS,
      label: _(PROFILE_SETTINGS.label),
    },
    {
      ...SEPARATOR,
    },
  ].filter(Boolean) as HeaderDropdownItemProps[];

export const getIsTransparent = (pathname: string): boolean =>
  pathname === '/' ||
  [
    '/buyers',
    '/create-methodology',
    '/methodology-review-process',
    '/create-credit-class',
    '/project-developers',
  ].some(route => pathname.startsWith(route));

export const getHeaderColors = (theme: Theme): HeaderColors => ({
  '/': theme.palette.primary.main,
  '/certificate': theme.palette.primary.main,
  '/create-methodology': theme.palette.primary.main,
  '/create-credit-class': theme.palette.primary.main,
  '/project-developers': theme.palette.primary.main,
  '/methodology-review-process': theme.palette.primary.main,
});

export const getBorderBottom = (pathname: string): boolean =>
  ['/project-pages', '/projects'].some(route => pathname.startsWith(route));
