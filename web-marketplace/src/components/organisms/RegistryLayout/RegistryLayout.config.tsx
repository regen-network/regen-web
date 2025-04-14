import { msg, Trans } from '@lingui/macro';
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
import { cn } from 'web-components/src/utils/styles/cn';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { isBridgeEnabled } from 'lib/ledger';

import {
  BRIDGE,
  CREDIT_BATCHES,
  CREDIT_CLASSES,
  EDIT_PROFILE,
  HEADING_MY_ORDERS,
  MY_ORDERS,
  // MY_PREFINANCE_PROJECTS,
  PORTFOLIO,
  PROFILE_SETTINGS,
  PROJECTS,
  // SAVED_PAYMENT_INFO,
  SEPARATOR,
} from 'pages/Dashboard/Dashboard.constants';
import { Link } from 'components/atoms';

export const getMenuItems = (
  pathname: string,
  _: TranslatorType,
  hasPrefinanceProjects: boolean,
): Item[] => {
  const projectsDropdown = hasPrefinanceProjects
    ? [
        {
          pathname,
          href: '/projects/1',
          label: _(msg`All projects`),
          linkComponent: Link,
          importCallback: (): Promise<any> =>
            import('../../../pages/Projects/AllProjects'),
        },
        {
          pathname,
          href: '/projects/prefinance',
          label: _(msg`Prefinance projects`),
          linkComponent: Link,
          importCallback: (): Promise<any> =>
            import('../../../pages/Projects/PrefinanceProjects'),
        },
      ]
    : undefined;

  return [
    {
      title: _(msg`Projects`),
      href: hasPrefinanceProjects ? undefined : '/projects/1',
      dropdownItems: projectsDropdown,
    },
    {
      title: _(msg`Stats`),
      dropdownItems: [
        {
          pathname,
          href: '/stats/activity',
          label: _(msg`Activity`),
          linkComponent: Link,
          importCallback: (): Promise<any> => import('../../../pages/Activity'),
        },
        {
          pathname,
          href: '/ecocredit-batches/1',
          label: _(msg`Ecocredit batches`),
          linkComponent: Link,
          importCallback: (): Promise<any> =>
            import('../../../pages/EcocreditBatches'),
        },
      ],
    },
  ];
};

interface GetUserMenuItemsParams {
  pathname: string;
  linkComponent: React.FC<NavLinkProps>;
  showCreditClasses?: boolean;
  isIssuer?: boolean;
  showProjects?: boolean;
  showOrders?: boolean;
  isWalletConnected: boolean;
  loginDisabled: boolean;
  profile?: UserMenuItemProfileProps;
  _: TranslatorType;
  onProfileClick?: OnProfileClickType;
  savedPaymentInfo: boolean;
}

export const getUserMenuItems = ({
  linkComponent,
  pathname,
  showCreditClasses,
  isIssuer,
  showProjects,
  showOrders,
  isWalletConnected,
  loginDisabled,
  profile,
  _,
  // savedPaymentInfo,
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
    {
      ...SEPARATOR,
    },
    showOrders && {
      ...HEADING_MY_ORDERS,
    },
    showOrders && {
      pathname,
      linkComponent,
      ...MY_ORDERS,
      label: _(MY_ORDERS.label),
    },
    // {
    //   pathname,
    //   linkComponent,
    //   ...MY_PREFINANCE_PROJECTS,
    //   label: _(MY_PREFINANCE_PROJECTS.label),
    // },
    // savedPaymentInfo && {
    //   pathname,
    //   linkComponent,
    //   ...SAVED_PAYMENT_INFO,
    //   label: _(SAVED_PAYMENT_INFO.label),
    // },
    {
      children: (
        <div
          className={cn(
            'text-xs text-grey-400 uppercase font-extrabold pl-20 tracking-wider',
            { 'pt-20': showOrders },
          )}
        >
          <Trans>profile</Trans>
        </div>
      ),
    },
    {
      pathname,
      linkComponent,
      ...EDIT_PROFILE,
      label: _(EDIT_PROFILE.label),
      disabled: loginDisabled,
      disabledTooltipText: _(EDIT_PROFILE.disabledTooltipText),
    },
    {
      pathname,
      linkComponent,
      ...PROFILE_SETTINGS,
      label: _(PROFILE_SETTINGS.label),
      disabled: loginDisabled,
      disabledTooltipText: _(PROFILE_SETTINGS.disabledTooltipText),
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
