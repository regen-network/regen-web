import React, { useMemo } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { getClientConfig } from 'clients/Clients.config';
import { getWalletAddress } from 'legacy-pages/Dashboard/Dashboard.utils';
import { getDefaultAvatar } from 'legacy-pages/ProfileEdit/ProfileEdit.utils';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { getUserMenuItems } from 'web-components/src/components/header/components/UserMenuItems.utils';
import { Theme } from 'web-components/src/theme/muiTheme';

// import { cn } from 'web-components/src/utils/styles/cn';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { Link, RegistryIconLink, RegistryNavLink } from '../../atoms';
import { ListProject } from '../ListProject/ListProject';
import { LoginButton } from '../LoginButton/LoginButton';
import {
  ADDRESS_COPIED,
  COPY_ADDRESS,
} from '../UserAccountSettings/UserAccountSettings.constants';
import {
  getBorderBottom,
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
} from './RegistryLayout.config';
import {
  AVATAR_ALT,
  CREATE_ORG,
  FINISH_ORG_CREATION,
  fullWidthRegExp,
  LOGOUT_TEXT,
  ORGANIZATION,
  ORGANIZATION_DASHBOARD,
  PERSONAL_DASHBOARD,
  PUBLIC_PROFILE,
  SIGNED_IN_AS,
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
    () => getMenuItems(pathname, _, !!hasPrefinanceProjects),
    [pathname, _, hasPrefinanceProjects],
  );

  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: Link,
        navLinkComponent: RegistryNavLink,
        pathname,
        profile: getProfile({
          account: activeAccount ?? accountByAddr,
          privActiveAccount,
          _,
          profileLink: '/dashboard', // TODO APP-670 update to merged profile link
          // TODO APP-670 should go /dashboard/admin/portfolio or /dashboard/admin/projects
          // APP-697 then to /dashboard/portfolio or /dashboard/projects
          dashboardLink: '/dashboard/admin/profile',
        }),
        textContent: {
          signedInAs: _(SIGNED_IN_AS),
          copyText: {
            tooltipText: _(COPY_ADDRESS),
            toastText: _(ADDRESS_COPIED),
          },
          publicProfile: _(PUBLIC_PROFILE),
          personalDashboard: _(PERSONAL_DASHBOARD),
          organizationDashboard: _(ORGANIZATION_DASHBOARD),
          organization: _(ORGANIZATION),
          createOrganization: _(CREATE_ORG),
          finishOrgCreation: _(FINISH_ORG_CREATION),
        },
      }),
    [pathname, activeAccount, accountByAddr, privActiveAccount, _],
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
