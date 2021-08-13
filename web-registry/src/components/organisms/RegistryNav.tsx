import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@material-ui/core/Box';

import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/HeaderMenuHover';
import { NavLink } from 'web-components/lib/components/header/NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from 'web-components/lib/components/header/HeaderDropdownItems';

import { RegistryIconLink, RegistryNavLink } from '../atoms';

import { projects } from '../../mocks';
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
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands',
      href: '/credit-classes/carbonplus-grasslands',
      svg: Cow /* , right: () => <PeerReviewed /> */,
    },
  ];

  const methodologyItems: HeaderDropdownItemProps[] = [
    {
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands',
      href: '/methodologies/carbonplus-grasslands',
      svg: Cow,
      /* right: () => <PeerReviewed />, */
    },
  ];

  const programStandardItems: HeaderDropdownItemProps[] = [
    {
      linkComponent: NavLink,
      href: 'https://regen-registry.s3.amazonaws.com/Regen+Registry+Program+Guide.pdf',
      title: 'Program Guide',
    },
    // { href: '/process', title: 'Process' },
  ];

  const programHowToItems: HeaderDropdownItemProps[] = [
    // { href: '/create-credit-class', title: 'Create a Credit Class', linkComponent: RegistryNavLink },
    { href: '/create-methodology', title: 'Create a Methodology', linkComponent: RegistryNavLink },
    {
      href: '/methodology-review-process',
      title: 'Methodology Review Process',
      linkComponent: RegistryNavLink,
    },
    // { href: '/become-a-monitor', title: 'Become a Monitor' },
    // { href: '/become-a-verifier', title: 'Become a Verifier' },
  ];

  /** for pages where we don't want to render full `name` */
  const titleAlias: { [title: string]: string } = {
    'The Kasigau Corridor REDD Project - Phase II The Community Ranches': 'Kasigau Corridor',
  };

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projects.map(p => ({
        title: titleAlias[p.name] || p.name,
        href: `/projects/${p.id}`,
        linkComponent: RegistryNavLink,
      })),
    },
    {
      title: 'Credit Classes',
      dropdownItems: creditClassItems,
      render: () => (
        <HeaderDropdownColumn
          // title="Carbon<i>Plus</i> Credits"
          items={creditClassItems}
          linkComponent={RegistryNavLink}
        />
      ),
    },
    {
      title: 'Methodologies',
      dropdownItems: methodologyItems,
      render: () => <HeaderDropdownColumn items={methodologyItems} linkComponent={RegistryNavLink} />,
    },
    {
      title: 'Program',
      dropdownItems: [...programStandardItems, ...programHowToItems],
      render: () => (
        <Box display="flex" justifyContent="space-between">
          <Box pr={20}>
            <HeaderDropdownColumn
              title="Standard"
              items={programStandardItems}
              linkComponent={RegistryNavLink}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <HeaderDropdownColumn title="How Tos" items={programHowToItems} linkComponent={RegistryNavLink} />
          </Box>
        </Box>
      ),
    },
  ];

  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/certificate': theme.palette.primary.main,
    '/create-methodology': theme.palette.primary.main,
    '/create-credit-class': theme.palette.primary.main,
    '/methodology-review-process': theme.palette.primary.main,
  };

  const isTransparent =
    pathname === '/' ||
    [
      '/create-methodology',
      '/methodology-review-process',
      '/create-credit-class',
      '/certificate',
    ].some(route => pathname.startsWith(route));

  return (
    <Header
      isRegistry
      linkComponent={RegistryNavLink}
      homeLink={RegistryIconLink}
      isAuthenticated={isAuthenticated}
      onLogin={() => loginWithRedirect({ redirectUri: window.location.origin })}
      onLogout={() => logout({ returnTo: window.location.origin })}
      onSignup={() => history.push('/signup')}
      menuItems={menuItems}
      color={headerColors[pathname] ? headerColors[pathname] : theme.palette.primary.light}
      transparent={isTransparent}
      absolute={isTransparent}
      // borderBottom={!isTransparent}
      borderBottom={false} // TODO there's a bug that prevents this from changing dynanmicly on route change so it shows on pages it shouldnt
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
    />
  );
};

export { RegistryNav };
