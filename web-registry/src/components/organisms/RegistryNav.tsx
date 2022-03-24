import React from 'react';
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
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

import { RegistryIconLink, RegistryNavLink, WalletButton } from '../atoms';
import { ReactComponent as Cow } from '../../assets/svgs/green-cow.svg';
import { ReactComponent as Credits } from '../../assets/svgs/credits.svg';
import DefaultAvatar from '../../assets/avatar.png';
import { useMoreProjectsQuery } from '../../generated/graphql';
import { useWallet } from '../../lib/wallet';
import { chainId } from '../../lib/ledger';

const RegistryNav: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { wallet, loaded } = useWallet();
  const theme = useTheme<Theme>();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;
  const { data: projectsData } = useMoreProjectsQuery();

  //  each custom dropdown still needs to be passed `dropdownItems` to render
  //  correctly on mobile, so I declare here to avoid duplicate code

  const carbonPlusItems: HeaderDropdownItemProps[] = [
    {
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands credit class',
      href: '/credit-classes/carbonplus-grasslands',
      svg: Cow /* , right: () => <PeerReviewed /> */,
    },
    {
      linkComponent: RegistryNavLink,
      title: 'Carbon<i>Plus</i> Grasslands methodology',
      href: '/methodologies/carbonplus-grasslands',
      svg: Cow,
      /* right: () => <PeerReviewed />, */
    },
  ];

  const programHowToItems: HeaderDropdownItemProps[] = [
    {
      linkComponent: NavLink,
      href: 'https://library.regen.network/v/regen-registry-program-guide/',
      title: 'Program Guide',
    },
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
    {
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

    if (loaded && wallet?.shortAddress && desktop) {
      menuItems.push({
        renderTitle: () => (
          <Box display="flex" alignItems="center" sx={{ fontSize: 14 }}>
            <Avatar
              sx={{
                height: 24,
                width: 24,
                mr: 2.75,
                border: theme => `1px solid ${theme.palette.grey[100]}`,
              }}
              alt="default avatar"
              src={DefaultAvatar}
            />
            {wallet.shortAddress}
          </Box>
        ),
        dropdownItems: [
          {
            linkComponent: RegistryNavLink,
            title: 'My Portfolio',
            href: '/ecocredits/dashboard',
            svg: Credits,
          },
        ],
      });
    }
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
