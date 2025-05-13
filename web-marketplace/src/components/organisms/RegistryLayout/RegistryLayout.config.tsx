import { msg, plural, Trans } from '@lingui/macro';
import { Theme } from '@mui/material';

import { HeaderColors } from 'web-components/src/components/header';
import { HeaderDropdownItemProps } from 'web-components/src/components/header/components/HeaderDropdown/HeaderDropdown.Item';
import { Item } from 'web-components/src/components/header/components/HeaderMenuItem/HeaderMenuItem';
import { NavLinkProps } from 'web-components/src/components/header/components/NavLink';
import {
  UserMenuItemProfile,
  UserMenuProfile,
} from 'web-components/src/components/header/components/UserMenuItem.Profile';

import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  PERSONAL_DASHBOARD,
  PUBLIC_PROFILE,
  SEPARATOR,
} from 'pages/Dashboard/Dashboard.constants';
import { Link } from 'components/atoms';

import {
  ADDRESS_COPIED,
  COPY_ADDRESS,
} from '../UserAccountSettings/UserAccountSettings.constants';

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
  profile?: UserMenuProfile;
  organizationProfiles?: UserMenuProfile[];
  _: TranslatorType;
  onProfileClick: () => void;
}

export const getUserMenuItems = ({
  linkComponent,
  pathname,
  profile,
  organizationProfiles,
  _,
  onProfileClick,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] => {
  const hasOrganizations =
    organizationProfiles && organizationProfiles.length > 0;
  return [
    profile && {
      children: (
        <div>
          <div className="text-[11px] text-grey-400 uppercase font-extrabold pl-15 tracking-wider font-extrabold">
            <Trans>signed in as</Trans>
          </div>
          <UserMenuItemProfile
            {...profile}
            onProfileClick={onProfileClick}
            publicProfileText={_(PUBLIC_PROFILE)}
            copyText={{
              tooltipText: _(COPY_ADDRESS),
              toastText: _(ADDRESS_COPIED),
            }}
          />
        </div>
      ),
    },
    {
      pathname,
      linkComponent,
      href: '/dashboard/admin/profile', // TODO APP-670 should go /dashboard/admin/portfolio or /dashboard/admin/projects
      ...PERSONAL_DASHBOARD,
      label: _(PERSONAL_DASHBOARD.label),
    },
    hasOrganizations && {
      ...SEPARATOR,
    },
    hasOrganizations && {
      children: (
        <div>
          <div className="text-[11px] text-grey-400 uppercase font-extrabold pl-15 tracking-wider font-extrabold">
            {plural(organizationProfiles.length, {
              one: 'organization',
              other: 'organizations',
            })}
          </div>
          <UserMenuItemProfile
            {...profile}
            onProfileClick={onProfileClick}
            publicProfileText={_(PUBLIC_PROFILE)}
            copyText={{
              tooltipText: _(COPY_ADDRESS),
              toastText: _(ADDRESS_COPIED),
            }}
          />
        </div>
      ),
    },
    // showOrders && {
    //   ...HEADING_MY_ORDERS,
    // },
    // showOrders && {
    //   pathname,
    //   linkComponent,
    //   ...MY_ORDERS,
    //   label: _(MY_ORDERS.label),
    // },
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
    // {
    //   children: (
    //     <div
    //       className={cn(
    //         'text-xs text-grey-400 uppercase font-extrabold pl-20 tracking-wider',
    //         { 'pt-20': showOrders },
    //       )}
    //     >
    //       <Trans>profile</Trans>
    //     </div>
    //   ),
    // },
    // {
    //   pathname,
    //   linkComponent,
    //   ...EDIT_PROFILE,
    //   label: _(EDIT_PROFILE.label),
    //   disabled: loginDisabled,
    //   disabledTooltipText: _(EDIT_PROFILE.disabledTooltipText),
    // },

    {
      ...SEPARATOR,
    },
  ].filter(Boolean) as HeaderDropdownItemProps[];
};

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
