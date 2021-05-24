import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import { projects } from '../../mocks';

function RegistryHeader(): JSX.Element {
  const { pathname } = useLocation();
  const theme = useTheme();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const projectDropdownItems: HeaderMenuItem['dropdownItems'] = projects.map(p => ({
    title: p.name,
    href: `/projects/${p.id}`,
  }));

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projectDropdownItems,
    },
    {
      title: 'Credit Classes',
      dropdownItems: [{ title: 'CarbonPlus Credits', href: '/' }],
    },
    {
      title: 'Methodologies',
      dropdownItems: [{ title: 'CarbonPlus Grasslands', href: '/' }],
    },
  ];

  const headerColors: HeaderColors = {
    '/certificate': theme.palette.primary.main,
  };

  return (
    <Header
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={pathname === '/certificate'}
      absolute={pathname === '/certificate'}
      borderBottom={pathname !== '/certificate'}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
}

export { RegistryHeader };
