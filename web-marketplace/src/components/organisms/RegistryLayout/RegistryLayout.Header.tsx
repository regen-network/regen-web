import React, { useMemo, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { getClientConfig } from 'clients/Clients.config';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { getUserMenuItems } from 'web-components/src/components/header/components/UserMenuItems.utils';
import { Theme } from 'web-components/src/theme/muiTheme';

import { AccountFieldsFragment, Maybe } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import {
  OrgProgressEntry,
  useOrganizationProgress,
} from 'lib/storage/organizationProgress.storage';
import { useWallet, Wallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { CREATE_ORG_FORM_ID } from 'pages/CreateOrganization/CreateOrganization.constants';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import {
  getDefaultAvatar,
  getWalletAddress,
} from 'pages/Dashboard/Dashboard.utils';
import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { Link, RegistryIconLink, RegistryNavLink } from '../../atoms';
import { AccountConnectWalletModal } from '../AccountConnectWalletModal/AccountConnectWalletModal';
import { ConnectWalletFlow } from '../ConnectWalletFlow/ConnectWalletFlow';
import { ListProject } from '../ListProject/ListProject';
import { useLoginData } from '../LoginButton/hooks/useLoginData';
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
  ORGANIZATION_PROFILE,
  PERSONAL_DASHBOARD,
  PERSONAL_PROFILE,
  SIGNED_IN_AS,
} from './RegistryLayout.constants';
// import { LanguageSwitcher } from './RegistryLayout.LanguageSwitcher';
import { getAddress, getProfile } from './RegistryLayout.utils';

const getProfileLink = (
  activeAccount: Maybe<AccountFieldsFragment> | undefined,
  wallet?: Wallet | null,
): string => {
  if (wallet?.address) return `/profiles/${wallet.address}`;
  if (activeAccount?.id) return `/profiles/${activeAccount.id}`;

  return '/profiles/';
};

const RegistryLayoutHeader: React.FC = () => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { activeAccount, privActiveAccount } = useAuth();
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [shouldRedirectToCreateOrg, setShouldRedirectToCreateOrg] =
    useState(false);
  const [error, setError] = useState<unknown>(undefined);

  const { wallet, disconnect, accountByAddr, connect, isConnected } =
    useWallet();
  const { accountOrWallet, noAccountAndNoWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);
  // const isHome = pathname === '/';
  const clientConfig = getClientConfig();

  const hasPrefinanceProjects = useLoaderData();
  const profileLink = getProfileLink(activeAccount, wallet);

  const { modalState, onButtonClick, onModalClose, walletsUiConfig } =
    useLoginData({});

  const organizationProfile = useMemo(
    () =>
      activeAccount?.type === 'ORGANIZATION'
        ? getProfile({
            account: activeAccount,
            privActiveAccount,
            _,
            profileLink,
            dashboardLink: '/dashboard',
            address: wallet?.address,
          })
        : undefined,
    [activeAccount, privActiveAccount, _, profileLink, wallet?.address],
  );

  const organizationProgress = useOrganizationProgress();

  const multiStepEntry = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const stored = window.localStorage.getItem(CREATE_ORG_FORM_ID);
      if (!stored) return undefined;
      const parsed = JSON.parse(stored);
      const daoAddress: string | undefined =
        parsed?.formValues?.dao?.daoAddress;
      if (!daoAddress) return undefined;
      return {
        daoAddress,
        step: parsed?.maxAllowedStep ?? 0,
        name: parsed?.formValues?.name,
        updatedAt: parsed?.updatedAt ?? new Date().toISOString(),
      } as OrgProgressEntry;
    } catch (error) {
      console.warn('Failed to parse create-organization storage', error);
      return undefined;
    }
  }, []);

  const unfinishedEntry = useMemo(() => {
    const entry = Object.values(organizationProgress)[0];
    return entry ?? multiStepEntry;
  }, [organizationProgress, multiStepEntry]);

  const unfinalizedOrgCreation = !!unfinishedEntry;

  const fallbackOrganizationProfile = useMemo(() => {
    if (!unfinishedEntry) return undefined;
    const fallbackName =
      unfinishedEntry.name || multiStepEntry?.name || _(DEFAULT_NAME);
    return {
      id: unfinishedEntry.daoAddress,
      name: fallbackName,
      profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
      truncatedAddress: getAddress({
        walletAddress: unfinishedEntry.daoAddress,
      }),
      address: unfinishedEntry.daoAddress,
      profileLink: '/organizations/create',
      dashboardLink: '/organizations/create',
    };
  }, [unfinishedEntry, _]);

  // Simple route handlers for org actions (kept minimal; no backend work here)
  const createOrganization = useMemo(
    () => () => {
      if (privActiveAccount && !isConnected) {
        setShouldRedirectToCreateOrg(true);
        setIsConnectWalletModalOpen(true);
      } else if (isConnected) {
        navigate('/organizations/create');
        onButtonClick();
      }
    },
    [navigate, privActiveAccount, isConnected, onButtonClick],
  );
  const finishOrgCreation = useMemo(
    () => () => {
      onButtonClick();
      navigate('/organizations/create');
    },
    [navigate, onButtonClick],
  );

  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
    setShouldRedirectToCreateOrg(false);
    onModalClose();
  };

  const handleWalletConnect = () => {
    connect &&
      connect({
        walletType: WalletType.Keplr,
        doLogin: true,
      });
  };

  // Handle successful wallet connection and redirect to create org if needed
  React.useEffect(() => {
    if (shouldRedirectToCreateOrg && isConnected && !isConnectWalletModalOpen) {
      setShouldRedirectToCreateOrg(false);
      navigate('/organizations/create');
    }
  }, [
    shouldRedirectToCreateOrg,
    isConnected,
    isConnectWalletModalOpen,
    navigate,
  ]);

  const menuItems = useMemo(
    () => getMenuItems(pathname, _, !!hasPrefinanceProjects),
    [pathname, _, hasPrefinanceProjects],
  );

  const menuOrganizationProfile =
    organizationProfile ?? fallbackOrganizationProfile;

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
          profileLink: profileLink,
          dashboardLink: '/dashboard',
          address: wallet?.address,
        }),
        organizationProfile: menuOrganizationProfile,
        createOrganization:
          !unfinalizedOrgCreation && activeAccount?.type !== 'ORGANIZATION'
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
      <AccountConnectWalletModal
        open={isConnectWalletModalOpen}
        onClose={handleConnectWalletModalClose}
        title="Please connect with Keplr to create an organization"
        description="Creating an organization requires signing a blockchain transaction. Learn more about wallets in our user guide."
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

export { RegistryLayoutHeader };
