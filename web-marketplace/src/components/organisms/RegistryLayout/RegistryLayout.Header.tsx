import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import { getClientConfig } from 'clients/Clients.config';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { Theme } from 'web-components/src/theme/muiTheme';

import { useAuth } from 'lib/auth/auth';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { getWalletAddress } from 'pages/Dashboard/Dashboard.utils';
import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
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
import { LanguageSwitcher } from './RegistryLayout.LanguageSwitcher';
import { getAddress } from './RegistryLayout.utils';

const RegistryLayoutHeader: React.FC = () => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const { activeAccount, privActiveAccount } = useAuth();

  const { wallet, disconnect, isConnected, loginDisabled } = useWallet();
  const { accountOrWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);
  const clientConfig = getClientConfig();

  const { showProjects, showCreditClasses, isIssuer } = useProfileItems({});
  const menuItems = useMemo(() => getMenuItems(pathname, _), [pathname, _]);
  const onProfileClick = useOnProfileClick();

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: !!activeAccount,
    }),
  );

  const savedPaymentInfo = (paymentMethodData?.paymentMethods?.length ?? 0) > 0;

  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: RegistryNavLink,
        pathname,
        showCreditClasses,
        isIssuer,
        showProjects,
        isWalletConnected: isConnected,
        loginDisabled,
        onProfileClick,
        savedPaymentInfo,
        profile: activeAccount
          ? {
              id: activeAccount.id,
              name: activeAccount.name ? activeAccount.name : _(DEFAULT_NAME),
              profileImage: activeAccount.image
                ? activeAccount.image
                : getDefaultAvatar(activeAccount),
              address: getAddress({
                walletAddress: activeAccount.addr,
                email: privActiveAccount?.email,
              }),
              selected: true,
            }
          : undefined,
        _,
      }),
    [
      pathname,
      showCreditClasses,
      isIssuer,
      showProjects,
      isConnected,
      loginDisabled,
      onProfileClick,
      savedPaymentInfo,
      activeAccount,
      _,
      privActiveAccount?.email,
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
        websiteExtras={
          <LanguageSwitcher className="text-sc-button-text-icon-light" />
        }
        extras={
          <Box display="flex" justifyContent="center" alignItems="center">
            {clientConfig.listProject && <ListProject />}
            <LanguageSwitcher className="mr-25 hidden lg:block" />
            {chainId && accountOrWallet && disconnect && (
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
      />
    </>
  );
};

export { RegistryLayoutHeader };
