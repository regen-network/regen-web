'use client';

import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { getClientConfig } from 'clients/Clients.config';
import { DEFAULT_PROFILE_USER_AVATAR } from 'legacy-pages/Dashboard/Dashboard.constants';
import { getWalletAddress } from 'legacy-pages/Dashboard/Dashboard.utils';
import { usePathname } from 'next/navigation';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { getUserMenuItems } from 'web-components/src/components/header/components/UserMenuItems.utils';
import { Theme } from 'web-components/src/theme/muiTheme';
import { cn } from 'web-components/src/utils/styles/cn';

import type { AccountFieldsFragment, Maybe } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { connectWalletDescription } from 'lib/constants/shared.constants';
import { ORG_ENABLED } from 'lib/env';
import { useWallet, Wallet } from 'lib/wallet/wallet';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { ConnectWalletFlow } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow';
import { useOrganizationActions } from 'components/organisms/RegistryLayout/hooks/useOrganizationActions';
import { LanguageSwitcher } from 'components/organisms/RegistryLayout/RegistryLayout.LanguageSwitcher';
import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../lib/ledger';
import { Link } from '../atoms';
import { HeaderNavLink } from '../atoms/HeaderNavLink';
import { HomeIconLink } from '../atoms/HomeIconLink';
import { ListProject } from '../organisms/ListProject/ListProject';
import { LoginButton } from '../organisms/LoginButton/LoginButton';
import { useHasPrefinanceProjects } from '../organisms/RegistryLayout/hooks/useHasPrefinanceProjects';
import {
  getBorderBottom,
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getNormalizedPathname,
} from '../organisms/RegistryLayout/RegistryLayout.config';
import {
  AVATAR_ALT,
  CONNECT_TO_KEPLR_ORGANIZATION,
  CREATE_ORG,
  CREATE_ORG_DISABLED_TOOLTIP,
  FINISH_ORG_CREATION,
  fullWidthRegExp,
  LOGOUT_TEXT,
  ORGANIZATION,
  ORGANIZATION_DASHBOARD,
  ORGANIZATION_PROFILE,
  PERSONAL_DASHBOARD,
  PERSONAL_PROFILE,
  SIGNED_IN_AS,
} from '../organisms/RegistryLayout/RegistryLayout.constants';
import {
  getAddress,
  getProfile,
} from '../organisms/RegistryLayout/RegistryLayout.utils';
import {
  ADDRESS_COPIED,
  COPY_ADDRESS,
} from '../organisms/UserAccountSettings/UserAccountSettings.constants';

const getProfileLink = (
  activeAccount: Maybe<AccountFieldsFragment> | undefined,
  wallet?: Wallet | null,
): string => {
  if (wallet?.address) return `/profiles/${wallet.address}`;
  if (activeAccount?.id) return `/profiles/${activeAccount.id}`;

  return '/profiles/';
};

export const LayoutHeader = () => {
  const { _ } = useLingui();
  const pathname = usePathname();

  const { activeAccount, privActiveAccount } = useAuth();
  const { wallet, disconnect, accountByAddr, loginDisabled } = useWallet();
  const { accountOrWallet, noAccountAndNoWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const normalizedPathname = getNormalizedPathname(pathname);

  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(
    () => getIsTransparent(normalizedPathname),
    [normalizedPathname],
  );
  const borderBottom = useMemo(
    () => getBorderBottom(normalizedPathname),
    [normalizedPathname],
  );
  const clientConfig = getClientConfig();
  const hasPrefinanceProjects = useHasPrefinanceProjects();
  const profileLink = getProfileLink(activeAccount, wallet);
  const personalDashboardLink = '/dashboard';

  const {
    modalState,
    walletsUiConfig,
    createOrganization,
    finishOrgCreation,
    menuOrganizationProfiles,
    unfinalizedOrgCreation,
    isConnectWalletModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
  } = useOrganizationActions();

  const menuItems = useMemo(
    () => getMenuItems(pathname, _, !!hasPrefinanceProjects),
    [pathname, _, hasPrefinanceProjects],
  );

  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: Link,
        navLinkComponent: HeaderNavLink,
        pathname,
        profile: getProfile({
          account: activeAccount ?? accountByAddr,
          privActiveAccount,
          _,
          profileLink,
          dashboardLink: personalDashboardLink,
          address: wallet?.address,
        }),
        orgEnabled: ORG_ENABLED,
        organizationProfiles: menuOrganizationProfiles,
        createOrganization: !unfinalizedOrgCreation
          ? createOrganization
          : undefined,
        unfinalizedOrgCreation,
        finishOrgCreation: unfinalizedOrgCreation
          ? finishOrgCreation
          : undefined,
        textContent: {
          signedInAs: _(SIGNED_IN_AS),
          copyText: {
            tooltipText: _(COPY_ADDRESS),
            toastText: _(ADDRESS_COPIED),
          },
          personalProfile: _(PERSONAL_PROFILE),
          organizationProfile: _(ORGANIZATION_PROFILE),
          personalDashboard: _(PERSONAL_DASHBOARD),
          organizationDashboard: _(ORGANIZATION_DASHBOARD),
          organization: _(ORGANIZATION),
          createOrganization: _(CREATE_ORG),
          finishOrgCreation: _(FINISH_ORG_CREATION),
          createOrgDisabledTooltip: _(CREATE_ORG_DISABLED_TOOLTIP),
        },
        loginDisabled,
      }),
    [
      pathname,
      activeAccount,
      accountByAddr,
      privActiveAccount,
      _,
      profileLink,
      wallet?.address,
      menuOrganizationProfiles,
      createOrganization,
      unfinalizedOrgCreation,
      finishOrgCreation,
      loginDisabled,
    ],
  );

  const color = headerColors[normalizedPathname]
    ? headerColors[normalizedPathname]
    : theme.palette.primary.light;

  const isHome = normalizedPathname === '/';

  return (
    <>
      <Header
        isRegistry
        linkComponent={HeaderNavLink}
        homeLink={HomeIconLink}
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
            <LanguageSwitcher
              className={cn(
                'mr-10 lg:mr-25 mt-1',
                isHome && 'md:text-sc-button-text-icon-light',
              )}
            />
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
                  activeAccount?.image
                    ? activeAccount?.image
                    : DEFAULT_PROFILE_USER_AVATAR
                }
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={HeaderNavLink}
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
      <AccountConnectWalletModal
        open={isConnectWalletModalOpen}
        onClose={handleConnectWalletModalClose}
        title={_(CONNECT_TO_KEPLR_ORGANIZATION)}
        description={connectWalletDescription}
        wallets={[
          {
            ...walletsUiConfig[0],
            onClick: handleWalletConnect,
          },
        ]}
        state={modalState}
      />
      <ConnectWalletFlow
        isConnectModalOpened={isConnectWalletModalOpen}
        onConnectModalClose={handleConnectWalletModalClose}
      />
    </>
  );
};
