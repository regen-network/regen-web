import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';

function AppHeader(): JSX.Element {
  const { pathname } = useLocation();
  const theme = useTheme();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const menuItems: HeaderMenuItem[] = [
    { title: 'Buyers', href: `${process.env.REACT_APP_WEBSITE_URL}/buyers/` },
    { title: 'Land Stewards', href: `${process.env.REACT_APP_WEBSITE_URL}/land-stewards/` },
    {
      title: 'Community',
      dropdownItems: [
        { title: 'Community Overview', href: `${process.env.REACT_APP_WEBSITE_URL}/community/` },
        { title: 'Developers', href: `${process.env.REACT_APP_WEBSITE_URL}/developers/` },
        { title: 'Scientists', href: `${process.env.REACT_APP_WEBSITE_URL}/science/` },
        { title: 'Validators', href: `${process.env.REACT_APP_WEBSITE_URL}/validators/` },
      ],
    },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: `${process.env.REACT_APP_WEBSITE_URL}/case-studies/` },
        { title: 'Resources', href: `${process.env.REACT_APP_WEBSITE_URL}/resources/` },
        { title: 'FAQ', href: `${process.env.REACT_APP_WEBSITE_URL}/faq/` },
        { title: 'Team', href: `${process.env.REACT_APP_WEBSITE_URL}/team/` },
      ],
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

export { AppHeader };
