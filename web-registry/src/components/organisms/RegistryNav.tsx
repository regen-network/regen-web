import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Header, { HeaderMenuItem, HeaderColors } from 'web-components/lib/components/header';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from 'web-components/lib/components/header/HeaderDropdownItems';

import { projects } from '../../mocks';
// import { PeerReviewed } from '../atoms';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';

const RegistryNav: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const theme = useTheme();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;

  //  each custom dropdown still needs to be passed `dropdownItems` to render
  //  correctly on mobile, so I declare here to avoid duplicate code
  const creditClassItems: HeaderDropdownItemProps[] = [
    {
      title: 'Carbon<i>Plus</i> Grasslands',
      href: '/credit-classes/carbonplus-grasslands',
      svg: Cow /* , right: () => <PeerReviewed /> */,
    },
  ];

  const methodologyItems: HeaderDropdownItemProps[] = [
    {
      title: 'Carbon<i>Plus</i> Grasslands',
      href: '/methodologies/carbonplus-grasslands',
      svg: Cow,
      /* right: () => <PeerReviewed />, */
    },
  ];

  const programStandardItems: HeaderDropdownItemProps[] = [
    {
      href: 'https://regen-registry.s3.amazonaws.com/Regen+Registry+Program+Guide.pdf',
      title: 'Program Guide',
    },
    // { href: '/process', title: 'Process' },
  ];

  const programHowToItems: HeaderDropdownItemProps[] = [
    { href: '/create-credit-class', title: 'Create a Credit Class' },
    { href: '/create-methodology', title: 'Create a Methodology' },
    { href: '/methodology-review-process', title: 'Methodology Review Process' },
    // { href: '/become-a-monitor', title: 'Become a Monitor' },
    // { href: '/become-a-verifier', title: 'Become a Verifier' },
  ];

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projects.map(p => ({
        title: p.name,
        href: `/projects/${p.id}`,
      })),
    },
    {
      title: 'Credit Classes',
      dropdownItems: creditClassItems,
      render: () => <HeaderDropdownColumn title="Carbon<i>Plus</i> Credits" items={creditClassItems} />,
    },
    {
      title: 'Methodologies',
      dropdownItems: methodologyItems,
      render: () => <HeaderDropdownColumn items={methodologyItems} />,
    },
    {
      title: 'Program',
      dropdownItems: [...programStandardItems, ...programHowToItems],
      render: () => (
        <Box display="flex" justifyContent="space-between">
          <Box pr={20}>
            <HeaderDropdownColumn title="Standard" items={programStandardItems} />
          </Box>
          <Box display="flex" flexDirection="column">
            <HeaderDropdownColumn title="How Tos" items={programHowToItems} />
          </Box>
        </Box>
      ),
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
  ].some(route => pathname.startsWith(route));

  return (
    <Header
      isRegistry
      isAuthenticated={isAuthenticated}
      onLogin={() => loginWithRedirect({ redirectUri: window.location.origin })}
      onLogout={() => logout({ returnTo: window.location.origin })}
      onSignup={() => history.push('/signup')}
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={isTransparent}
      absolute={isTransparent}
      borderBottom={!isTransparent}
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
};

export { RegistryNav };
