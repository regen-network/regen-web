import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useSetAtom } from 'jotai';

import Header from 'web-components/lib/components/header';
import { OnProfileClickType } from 'web-components/lib/components/header/components/UserMenuItem.types';
import { UserMenuItems } from 'web-components/lib/components/header/components/UserMenuItems';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { addWalletModalSwitchWarningAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink } from '../../atoms';
import { LoginButton } from '../LoginButton/LoginButton';
import {
  getBorderBottom,
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getUserMenuItems,
} from './RegistryLayout.config';
import { fullWidthRegExp } from './RegistryLayout.constants';
import { getAddress } from './RegistryLayout.utils';

const RegistryLayoutHeader: React.FC = () => {
  const { pathname } = useLocation();
  const {
    authenticatedAccounts,
    activeAccount,
    privActiveAccount,
    privAuthenticatedAccounts,
  } = useAuth();
  const { wallet, disconnect, isConnected } = useWallet();
  const { accountOrWallet } = useAuthData();

  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);

  const { showProjects, showCreditClasses, isIssuer } = useProfileItems({});
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname]);
  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: RegistryNavLink,
        pathname,
        showCreditClasses,
        isIssuer,
        showProjects,
        isWalletConnected: isConnected,
      }),
    [pathname, showCreditClasses, isIssuer, showProjects, isConnected],
  );
  const setAddWalletModalSwitchWarningAtom = useSetAtom(
    addWalletModalSwitchWarningAtom,
  );
  const onProfileClick: OnProfileClickType = (isSelected: boolean) =>
    isSelected
      ? navigate('/profile')
      : setAddWalletModalSwitchWarningAtom(atom => void (atom.open = true));

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
            {chainId && accountOrWallet && disconnect && (
              <UserMenuItems
                address={getAddress({
                  walletAddress: wallet?.address,
                  email: privActiveAccount?.email,
                })}
                avatar={
                  activeAccount?.image ? activeAccount?.image : defaultAvatar
                }
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={RegistryNavLink}
                userMenuItems={userMenuItems}
                profiles={
                  authenticatedAccounts?.map((account, i) => ({
                    name: account?.name ? account?.name : DEFAULT_NAME,
                    profileImage: account?.image
                      ? account?.image
                      : getDefaultAvatar(account),
                    address: getAddress({
                      walletAddress: account?.addr,
                      email: privAuthenticatedAccounts?.[i].email,
                    }),
                    selected:
                      activeAccount?.id && activeAccount?.id === account?.id,
                  })) || []
                }
                onProfileClick={onProfileClick}
                // TODO (#2193): add account functionality
              />
            )}
            <LoginButton />
          </Box>
        }
      />
    </>
  );
};

export { RegistryLayoutHeader };
