import { msg } from '@lingui/core/macro';
import { Theme } from '@mui/material';

import { HeaderColors } from 'web-components/src/components/header';
import { Item } from 'web-components/src/components/header/components/HeaderMenuItem/HeaderMenuItem';

import { TranslatorType } from 'lib/i18n/i18n.types';

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
        },
        {
          pathname,
          href: '/projects/prefinance',
          label: _(msg`Prefinance projects`),
          linkComponent: Link,
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
        },
        {
          pathname,
          href: '/ecocredit-batches/1',
          label: _(msg`Ecocredit batches`),
          linkComponent: Link,
        },
      ],
    },
  ];
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
