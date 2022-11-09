import React, { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { URL_PRIVACY, URL_TERMS_SERVICE } from 'globals';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';
import Header from 'web-components/lib/components/header';
import { UserMenuItem } from 'web-components/lib/components/header/components/UserMenuItem';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { truncate } from 'web-components/lib/utils/truncate';

import { useWallet } from 'lib/wallet/wallet';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import DefaultAvatar from '../../../assets/avatar.png';
import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink, ScrollToTop } from '../../atoms';
import { AppFooter } from '../AppFooter';
import { WalletButton } from '../WalletButton/WalletButton';
import {
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
} from './RegistryLayout.config';
import { fullWidthRegExp } from './RegistryLayout.constants';

const RegistryLayout: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { wallet, loaded, disconnect } = useWallet();
  const theme = useTheme<Theme>();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname]);

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
                address={truncate(wallet?.address)}
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
