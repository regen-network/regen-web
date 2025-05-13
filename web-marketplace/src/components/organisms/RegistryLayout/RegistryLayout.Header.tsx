import React, { useMemo } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { getClientConfig } from 'clients/Clients.config';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { Theme } from 'web-components/src/theme/muiTheme';

// import { cn } from 'web-components/src/utils/styles/cn';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { getWalletAddress } from 'pages/Dashboard/Dashboard.utils';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink } from '../../atoms';
import { ListProject } from '../ListProject/ListProject';
import { LoginButton } from '../LoginButton/LoginButton';
import { useOnProfileClick } from './hooks/useOnProfileClick';
import {
  getBorderBottom,
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getUserMenuItems,
} from './RegistryLayout.config';
import {
  AVATAR_ALT,
  fullWidthRegExp,
  LOGOUT_TEXT,
} from './RegistryLayout.constants';
// import { LanguageSwitcher } from './RegistryLayout.LanguageSwitcher';
import { getAddress, getProfile } from './RegistryLayout.utils';

const RegistryLayoutHeader: React.FC = () => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const { activeAccount, privActiveAccount } = useAuth();

  const { wallet, disconnect, accountByAddr } = useWallet();
  const { accountOrWallet, noAccountAndNoWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);
  // const isHome = pathname === '/';
  const clientConfig = getClientConfig();

  const hasPrefinanceProjects = useLoaderData();

  const menuItems = useMemo(
    () => getMenuItems(pathname, _, hasPrefinanceProjects as boolean),
    [pathname, _, hasPrefinanceProjects],
  );
  const onProfileClick = useOnProfileClick();

  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: RegistryNavLink,
        pathname,
        onProfileClick,
        profile: getProfile({
          account: activeAccount ?? accountByAddr,
          privActiveAccount,
          _,
        }),
        _,
      }),
    [
      pathname,
      onProfileClick,
      activeAccount,
      accountByAddr,
      privActiveAccount,
      _,
    ],
  );

  const defaultAvatar = getDefaultAvatar(activeAccount);

  const color = headerColors[pathname]
    ? headerColors[pathname]
    : theme.palette.primary.light;

  return (
    <>
      <Header
        isRegistry
        linkComponent={RegistryNavLink}
        homeLink={RegistryIconLink}
        menuItems={menuItems}
        color={color}
        transparent={isTransparent}
        absolute={isTransparent}
        borderBottom={borderBottom}
        fullWidth={fullWidthRegExp.test(pathname)}
        pathname={pathname}
        extras={
          <Box display="flex" justifyContent="center" alignItems="center">
            {clientConfig.listProject && <ListProject />}
            {/* // Commenting out temporarily until content translations completed
            <LanguageSwitcher
              className={cn(
                'mr-25 mt-1 hidden lg:block',
                isHome && 'text-sc-button-text-icon-light',
              )}
            /> */}
            {chainId && accountOrWallet && (
              <UserMenuItems
                nameOrAddress={
                  activeAccount?.name ||
                  getAddress({
                    walletAddress: getWalletAddress({ activeAccount, wallet }),
                    email: privActiveAccount?.email,
                  })
                }
                avatar={
                  activeAccount?.image ? activeAccount?.image : defaultAvatar
                }
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={RegistryNavLink}
                userMenuItems={userMenuItems}
                logoutText={_(LOGOUT_TEXT)}
                avatarAlt={_(AVATAR_ALT)}
              />
            )}
            {clientConfig.loginButton && <LoginButton />}
          </Box>
        }
        isUserLoggedIn={!noAccountAndNoWallet}
      />
    </>
  );
};

export { RegistryLayoutHeader };
