import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { URL_PRIVACY, URL_TERMS_SERVICE } from 'globals';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import Header, { HeaderColors } from 'web-components/lib/components/header';
import { HeaderMenuItem } from 'web-components/lib/components/header/components/HeaderMenuHover/HeaderMenuHover';
import { UserMenuItem } from 'web-components/lib/components/header/components/UserMenuItem';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { truncate } from 'web-components/lib/utils/truncate';

import { useWallet } from 'lib/wallet/wallet';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import DefaultAvatar from '../../assets/avatar.png';
import { chainId } from '../../lib/ledger';
import { RegistryIconLink, RegistryNavLink, ScrollToTop } from '../atoms';
import { AppFooter } from './AppFooter';
import { WalletButton } from './WalletButton/WalletButton';

const RegistryLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { wallet, loaded, disconnect } = useWallet();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const fullWidthRegExp: RegExp = /projects\/[a-z-]+/;

  //  each custom dropdown still needs to be passed `dropdownItems` to render
  //  correctly on mobile, so I declare here to avoid duplicate code

  const menuItems: HeaderMenuItem[] = [
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Trade',
      href: '/storefront',
    },
    {
      title: 'Activity',
      href: '/stats/activity',
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

  const color = headerColors[pathname]
    ? headerColors[pathname]
    : theme.palette.primary.light;

  return (
    <>
      <Header
        isRegistry
        linkComponent={RegistryNavLink}
        homeLink={RegistryIconLink}
        isAuthenticated={isAuthenticated}
        onLogin={() =>
          loginWithRedirect({ redirectUri: window.location.origin })
        }
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
            {chainId && loaded && wallet?.address && disconnect && (
              <UserMenuItem
                address={
                  isMobile ? truncate(wallet?.address) : wallet?.shortAddress
                }
                avatar={DefaultAvatar}
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={RegistryNavLink}
              />
            )}
            <WalletButton />
          </Box>
        }
      />
      <Outlet />
      <AppFooter />
      <PageViewTracking />
      <ScrollToTop />
      <CookiesBanner privacyUrl={URL_PRIVACY} TOSUrl={URL_TERMS_SERVICE} />
    </>
  );
};

export { RegistryLayout };
