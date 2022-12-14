import { Theme } from '@mui/material';

import { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/components/HeaderMenuHover/HeaderMenuHover';

import { Link } from 'components/atoms';

export const getMenuItems = (pathname: string): HeaderMenuItem[] => [
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
      },
      {
        pathname,
        href: '/ecocredit-batches/1',
        title: 'Ecocredit batches',
        linkComponent: Link,
      },
    ],
  },
];

export const getIsTransparent = (pathname: string): boolean =>
  pathname === '/' ||
  [
    '/buyers',
    '/create-methodology',
    '/methodology-review-process',
    '/create-credit-class',
    '/certificate',
    '/land-stewards',
  ].some(route => pathname.startsWith(route));

export const getHeaderColors = (theme: Theme): HeaderColors => ({
  '/': theme.palette.primary.main,
  '/certificate': theme.palette.primary.main,
  '/create-methodology': theme.palette.primary.main,
  '/create-credit-class': theme.palette.primary.main,
  '/land-stewards': theme.palette.primary.main,
  '/methodology-review-process': theme.palette.primary.main,
});
