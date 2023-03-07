import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';

import Header from 'web-components/lib/components/header';
import { UserMenuItem } from 'web-components/lib/components/header/components/UserMenuItem';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { truncate } from 'web-components/lib/utils/truncate';

import { useWallet } from 'lib/wallet/wallet';

import DefaultAvatar from '../../../assets/avatar.png';
import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink } from '../../atoms';
import { WalletButton } from '../WalletButton/WalletButton';
import {
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getUserMenuItems,
} from './RegistryLayout.config';
import { fullWidthRegExp } from './RegistryLayout.constants';

const RegistryLayoutHeader: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { wallet, loaded, disconnect, accountId } = useWallet();
  const theme = useTheme<Theme>();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname]);
  const userMenuItems = useMemo(
    () => getUserMenuItems({ linkComponent: RegistryNavLink, pathname, theme }),
    [pathname, theme],
  );

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
            {chainId &&
              loaded &&
              accountId &&
              wallet?.address &&
              disconnect && (
                <UserMenuItem
                  address={truncate(wallet?.address)}
                  avatar={DefaultAvatar}
                  disconnect={disconnect}
                  pathname={pathname}
                  linkComponent={RegistryNavLink}
                  userMenuItems={userMenuItems}
                />
              )}
            <WalletButton />
          </Box>
        }
      />
    </>
  );
};

export { RegistryLayoutHeader };
