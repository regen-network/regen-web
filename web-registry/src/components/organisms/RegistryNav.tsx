import React from 'react';
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/HeaderMenuHover';
import { NavLink } from 'web-components/lib/components/header/NavLink';
import {
  HeaderDropdownColumn,
  HeaderDropdownItemProps,
} from 'web-components/lib/components/header/HeaderDropdownItems';
import { UserMenuItem } from 'web-components/lib/components/header/UserMenuItem';

import { RegistryIconLink, RegistryNavLink, WalletButton } from '../atoms';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';
import DefaultAvatar from '../../assets/avatar.png';
import { useMoreProjectsQuery } from '../../generated/graphql';
import { useWallet } from '../../lib/wallet';
import { chainId } from '../../lib/ledger';

const RegistryNav: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { wallet, loaded, disconnect } = useWallet();
  const theme = useTheme<Theme>();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const { data: projectsData } = useMoreProjectsQuery();

  //  each custom dropdown still needs to be passed `dropdownItems` to render
  //  correctly on mobile, so I declare here to avoid duplicate code

  const carbonPlusItems: HeaderDropdownItemProps[] = [
    {
      pathname,
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands credit class',
      href: '/credit-classes/carbonplus-grasslands',
      svg: Cow /* , right: () => <PeerReviewed /> */,
    },
    {
      pathname,
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands methodology',
      href: '/methodologies/carbonplus-grasslands',
      svg: Cow,
      /* right: () => <PeerReviewed />, */
    },
  ];

  const programHowToItems: HeaderDropdownItemProps[] = [
    {
      pathname,
      linkComponent: NavLink,
      href: 'https://library.regen.network/v/regen-registry-program-guide/',
      title: 'Program Guide',
    },
    // { href: '/create-credit-class', title: 'Create a Credit Class', linkComponent: RegistryNavLink },
    {
      pathname,
      href: '/create-methodology',
      title: 'Create a Methodology',
      linkComponent: RegistryNavLink,
    },
    {
      pathname,
      href: '/methodology-review-process',
      title: 'Methodology Review Process',
      linkComponent: RegistryNavLink,
    },
    {
      pathname,
      href: 'https://library.regen.network/',
      title: 'Regen Registry Library',
      linkComponent: RegistryNavLink,
    },
    // { href: '/become-a-monitor', title: 'Become a Monitor' },
    // { href: '/become-a-verifier', title: 'Become a Verifier' },
  ];

  /** for pages where we don't want to render full `name` */
  const titleAlias: { [title: string]: string } = {
    'The Kasigau Corridor REDD Project - Phase II The Community Ranches':
      'Kasigau Corridor',
    'The Mai Ndombe REDD+ Project': 'Mai Ndombe',
  };

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      dropdownItems: projectsData?.allProjects?.nodes?.map(p => ({
        pathname,
        title:
          titleAlias[p?.metadata?.['schema:name']] ||
          p?.metadata?.['schema:name'] ||
          p?.handle,
        href: `/projects/${p?.handle}`,
        linkComponent: RegistryNavLink,
      })),
    },
    {
      title: 'Program',
      dropdownItems: [...carbonPlusItems, ...programHowToItems],
      renderDropdownItems: () => (
        <Box display="flex" justifyContent="space-between">
          <Box pr={20}>
            <HeaderDropdownColumn
              title="CarbonPlus"
              items={carbonPlusItems}
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

  if (chainId) {
    menuItems.unshift({
      title: 'NCT',
      href: '/baskets/eco.uC.NCT',
    });
    menuItems.splice(2, 0, {
      title: 'Activity',
      href: '/stats/activity',
    });
  }

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

  const color = headerColors[pathname]
    ? headerColors[pathname]
    : theme.palette.primary.light;

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
      color={color}
      transparent={isTransparent}
      absolute={isTransparent}
      borderBottom={false} // TODO: there's some bug where this won't change on routes - hardcoded for now
      fullWidth={fullWidthRegExp.test(pathname)}
      pathname={pathname}
      extras={
        <Box display="flex" justifyContent="center" alignItems="center">
          {chainId &&
            loaded &&
            wallet?.shortAddress &&
            disconnect &&
            desktop && (
              <UserMenuItem
                address={wallet?.shortAddress}
                avatar={DefaultAvatar}
                disconnect={disconnect}
                pathname={pathname}
                color={color}
                linkComponent={RegistryNavLink}
              />
            )}
          <WalletButton />
        </Box>
      }
    />
  );
};

export { RegistryNav };
