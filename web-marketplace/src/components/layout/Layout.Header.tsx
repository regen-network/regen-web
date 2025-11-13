'use client';

import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { getClientConfig } from 'clients/Clients.config';
import { getWalletAddress } from 'legacy-pages/Dashboard/Dashboard.utils';
import { usePathname } from 'next/navigation';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { getUserMenuItems } from 'web-components/src/components/header/components/UserMenuItems.utils';
import { Theme } from 'web-components/src/theme/muiTheme';

import type { AccountFieldsFragment, Maybe } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { ORG_ENABLED } from 'lib/env';
import { useWallet, Wallet } from 'lib/wallet/wallet';

import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import { ConnectWalletFlow } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow';
import { useOrganizationActions } from 'components/organisms/RegistryLayout/hooks/useOrganizationActions';
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
} from '../organisms/RegistryLayout/RegistryLayout.config';
import {
  AVATAR_ALT,
  CONNECT_TO_KEPLR_ORGANIZATION,
  CREATE_ORG,
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
  const { wallet, disconnect, accountByAddr, connect, isConnected } =
    useWallet();
  const { accountOrWallet, noAccountAndNoWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);
  const clientConfig = getClientConfig();

  const hasPrefinanceProjects = useHasPrefinanceProjects();
  const profileLink = getProfileLink(activeAccount, wallet);
  const personalDashboardLink = '/dashboard';

  const {
    modalState,
    walletsUiConfig,
    createOrganization,
    finishOrgCreation,
    defaultAvatar,
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    isConnectWalletModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
    setError,
  } = useOrganizationActions({
    activeAccount,
    privActiveAccount,
    wallet,
    connect,
    isConnected,
  });

  const connectWalletDescription = (
    <Trans>
      Creating an organization requires signing a blockchain transaction. Learn
      more about wallets in our{' '}
      <Link
        href="https://guides.regen.network/guides/wallets"
        className="font-bold bg-clip-text text-transparent bg-blue-green-gradient"
      >
        user guide.
      </Link>
    </Trans>
  );

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
        organizationProfile: menuOrganizationProfile,
        createOrganization:
          !menuOrganizationProfile && !unfinalizedOrgCreation
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
        },
      }),
    [
      pathname,
      activeAccount,
      accountByAddr,
      privActiveAccount,
      _,
      profileLink,
      wallet?.address,
      menuOrganizationProfile,
      createOrganization,
      unfinalizedOrgCreation,
      finishOrgCreation,
    ],
  );

  const color = headerColors[pathname]
    ? headerColors[pathname]
    : theme.palette.primary.light;

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
        setError={setError}
        onConnectModalClose={handleConnectWalletModalClose}
      />
    </>
  );
};
