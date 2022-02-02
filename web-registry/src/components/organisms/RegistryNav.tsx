import React from 'react';
import { useTheme } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/HeaderMenuHover';
import { NavLink } from 'web-components/lib/components/header/NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from 'web-components/lib/components/header/HeaderDropdownItems';

import { RegistryIconLink, RegistryNavLink, WalletButton } from '../atoms';

import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';
import { ReactComponent as BuyersIcon } from '../../assets/svgs/buyers.svg';
import { ReactComponent as LandStewardsIcon } from '../../assets/svgs/land-stewards.svg';
import { useMoreProjectsQuery } from '../../generated/graphql';

const RegistryNav: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const theme = useTheme<Theme>();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const { data: projectsData } = useMoreProjectsQuery();

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

  const stakeholderItems: HeaderDropdownItemProps[] = [
    {
      linkComponent: RegistryNavLink,
      title: 'Buyers',
      href: '/buyers',
      svg: BuyersIcon,
    },
    {
      linkComponent: RegistryNavLink,
      title: 'Land Stewards',
      href: '/land-stewards',
      svg: LandStewardsIcon,
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
    {
      href: '/create-methodology',
      title: 'Create a Methodology',
      linkComponent: RegistryNavLink,
    },
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
    'The Kasigau Corridor REDD Project - Phase II The Community Ranches':
      'Kasigau Corridor',
  };

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projectsData?.allProjects?.nodes?.map(p => ({
        title:
          titleAlias[p?.metadata?.['http://schema.org/name']] ||
          p?.metadata?.['http://schema.org/name'],
        href: `/projects/${p?.handle}`,
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
      render: () => (
        <HeaderDropdownColumn
          items={methodologyItems}
          linkComponent={RegistryNavLink}
        />
      ),
    },
    {
      title: 'Stakeholders',
      dropdownItems: stakeholderItems,
      render: () => (
        <HeaderDropdownColumn
          items={stakeholderItems}
          linkComponent={RegistryNavLink}
        />
      ),
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
            <HeaderDropdownColumn
              title="How Tos"
              items={programHowToItems}
              linkComponent={RegistryNavLink}
            />
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
    '/land-stewards': theme.palette.primary.main,
    '/methodology-review-process': theme.palette.primary.main,
  };

  const isTransparent =
    pathname === '/' ||
    [
      '/buyers',
      '/create-methodology',
      '/methodology-review-process',
      '/create-credit-class',
      '/certificate',
      '/land-stewards',
    ].some(route => pathname.startsWith(route));

  return (
    <Header
      isRegistry
      linkComponent={RegistryNavLink}
      homeLink={RegistryIconLink}
      isAuthenticated={isAuthenticated}
      onLogin={() => loginWithRedirect({ redirectUri: window.location.origin })}
      onLogout={() => logout({ returnTo: window.location.origin })}
      onSignup={() => navigate('/signup')}
      menuItems={menuItems}
      color={
        headerColors[pathname]
          ? headerColors[pathname]
          : theme.palette.primary.light
      }
      transparent={isTransparent}
      absolute={isTransparent}
      borderBottom={!isTransparent}
      // borderBottom={false} // TODO there's a bug that prevents this from changing dynanmicly on route change so it shows on pages it shouldnt
      fullWidth={fullWidthRegExp.test(pathname)}
      pathName={pathname}
      extras={
        <Box display="flex" justifyContent="center" alignItems="center">
          <WalletButton />
        </Box>
      }
    />
  );
};

export { RegistryNav };
