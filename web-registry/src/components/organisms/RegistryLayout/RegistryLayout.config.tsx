import { Theme } from '@mui/material';

import { HeaderColors } from 'web-components/lib/components/header';
import { HeaderDropdownItemProps } from 'web-components/lib/components/header/components/HeaderDropdown/HeaderDropdown.Item';
import { Item } from 'web-components/lib/components/header/components/HeaderMenuItem/HeaderMenuItem';
import { NavLinkProps } from 'web-components/lib/components/header/components/NavLink';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';

import { isBridgeEnabled } from 'lib/ledger';

import { Link } from 'components/atoms';

export const getMenuItems = (pathname: string): Item[] => [
  {
    title: 'NCT',
    href: '/baskets/eco.uC.NCT',
  },
  {
    title: 'Projects',
    href: '/projects/1',
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
        title: 'Activity',
        linkComponent: Link,
        importCallback: (): Promise<any> => import('../../../pages/Activity'),
      },
      {
        pathname,
        href: '/ecocredit-batches/1',
        title: 'Ecocredit batches',
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
  theme: Theme;
}

export const getUserMenuItems = ({
  linkComponent,
  pathname,
  theme,
}: GetUserMenuItemsParams): HeaderDropdownItemProps[] =>
  [
    {
      pathname,
      linkComponent,
      title: 'My Portfolio',
      href: '/ecocredits/portfolio',
      icon: (
        <CreditsIcon
          sx={{ height: 18, width: 20 }}
          color={theme.palette.secondary.main}
        />
      ),
      importCallback: (): Promise<any> => import('../../../pages/Dashboard'),
    },
    isBridgeEnabled
      ? {
          pathname,
          linkComponent,
          title: 'Bridge',
          icon: <BridgeIcon />,
          href: '/ecocredits/bridge',
        }
      : undefined,
  ].filter(Boolean) as HeaderDropdownItemProps[];

export const getIsTransparent = (pathname: string): boolean =>
  pathname === '/' ||
  [
    '/buyers',
    '/create-methodology',
    '/methodology-review-process',
    '/create-credit-class',
    '/certificate',
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
