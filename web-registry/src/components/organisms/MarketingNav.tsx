import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';

// TODO: this file can probably be removed when we implement homepage - replaced by `RegistryHeader`
const MarketingNav: React.FC = () => {
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
    '/create-methodology': theme.palette.primary.main,
    '/create-credit-class': theme.palette.primary.main,
    '/methodology-review-process': theme.palette.primary.main,
  };

  const isTransparent = [
    '/create-methodology',
    '/methodology-review-process',
    '/create-credit-class',
    '/certificate',
    '/credit-classes',
  ].some(route => pathname.startsWith(route));

  return (
    <Header
      isRegistry
      menuItems={menuItems}
      color={headerColors[pathname] || theme.palette.primary.light}
      transparent={isTransparent}
      absolute={isTransparent}
      borderBottom={!isTransparent}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
};

export { MarketingNav };
