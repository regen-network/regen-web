import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useProfileItems } from 'legacy-pages/Dashboard/hooks/useProfileItems';
import { useOrders } from 'legacy-pages/Orders/hooks/useOrders';
import { startCase } from 'lodash';
import { useRouter } from 'next/navigation';
import { getAccountAssignment } from 'utils/rbam.utils';

import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import type { Account } from 'generated/graphql';
import { AccountType } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import {
  connectWalletDescription,
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from 'lib/constants/shared.constants';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { AccountConnectWalletModal } from 'components/organisms/AccountConnectWalletModal/AccountConnectWalletModal';
import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ConnectWalletFlow } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow';
import { DashboardNavigation } from 'components/organisms/DashboardNavigation';
import {
  ORG,
  USER,
} from 'components/organisms/DashboardNavigation/DashboardNavigation.constants';
import { DashboardNavigationMobileHeader } from 'components/organisms/DashboardNavigation/DashboardNavigation.MobileHeader';
import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';
import { useOrganizationActions } from 'components/organisms/RegistryLayout/hooks/useOrganizationActions';
import { CONNECT_TO_KEPLR_ORGANIZATION } from 'components/organisms/RegistryLayout/RegistryLayout.constants';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { NavigationProvider } from '../../components/organisms/DashboardNavigation/contexts/NavigationContext';
import {
  BRIDGE,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  ORGANIZATION_DASHBOARD,
  PERSONAL_ACCOUNT,
  PERSONAL_DASHBOARD,
  PORTFOLIO,
  PORTFOLIO_TABS_ARIA_LABEL,
} from './Dashboard.constants';
import { dashboardConnectWalletFlowAtom } from './Dashboard.store';
import { DashboardNavAccount } from './Dashboard.types';
import {
  getActivePortfolioTab,
  getPortfolioTabs,
  getWalletAddress,
} from './Dashboard.utils';
import { ViewProfileButton } from './Dashboard.ViewProfileButton';
import { useBridgeAvailability } from './hooks/useBridgeAvailabilty';
import { usePathSection } from './hooks/usePathSection';
import { useFetchProjectByAdmin } from './MyProjects/hooks/useFetchProjectsByAdmin';

export const Dashboard = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { accountChanging, disconnect, loginDisabled, wallet } = useWallet();
  const { loading, activeAccount, activeAccountId, privActiveAccount } =
    useAuth();

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [shouldResumeConnectWalletFlow, setShouldResumeConnectWalletFlow] =
    useAtom(dashboardConnectWalletFlowAtom);

  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const {
    modalState,
    walletsUiConfig,
    createOrganization,
    finishOrgCreation,
    unfinalizedOrgName,
    unfinalizedOrgCreation,
    isConnectWalletModalOpen,
    handleConnectWalletModalClose,
    handleWalletConnect,
    clearConnectWalletFlow,
    openConnectWalletModal,
  } = useOrganizationActions();

  const orgDashboardBasePath = '/dashboard/organization';
  const personalDashboardBasePath = '/dashboard';
  const isOrganizationDashboard = pathname.startsWith(orgDashboardBasePath);
  const dashboardBasePath = isOrganizationDashboard
    ? orgDashboardBasePath
    : personalDashboardBasePath;
  const section = usePathSection();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: sanityProfilePageData } = useQuery(
    getAllProfilePageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  useEffect(() => {
    if (isDirtyRef && setIsProfileEditDirtyref) {
      setIsProfileEditDirtyref(isDirtyRef);
    }
  }, [isDirtyRef, setIsProfileEditDirtyref]);

  const handleLogout = async () => {
    try {
      await disconnect();
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      router.push('/');
    }
  };

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = sectionName
      ? `${dashboardBasePath}/${sectionName.replace(' ', '-')}`
      : dashboardBasePath;
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
    }
  };

  const personalResolvedAddress = useMemo(() => {
    const walletAddress = getWalletAddress({ activeAccount, wallet });
    if (walletAddress) return walletAddress;
    return privActiveAccount?.email || '';
  }, [activeAccount, wallet, privActiveAccount?.email]);

  const organizationDao = useDaoOrganization();
  const organizationAddress = organizationDao?.address ?? null;
  const organizationProfile = organizationDao?.organizationByDaoAddress;

  const { data, isLoading: isOrgDataLoading } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!organizationAddress,
      address: organizationAddress as string,
    }),
  );
  const assignments = data?.daoByAddress?.assignmentsByDaoAddress?.nodes;

  const organizationAccount = useMemo<DashboardNavAccount | undefined>(() => {
    if (!organizationAddress || !organizationDao) return undefined;

    const assignment = getAccountAssignment({
      accountId: activeAccountId,
      assignments,
    });

    const organizationName = organizationProfile?.name?.trim();

    const rawImage = organizationProfile?.image?.trim() || '';
    const organizationImage = rawImage || DEFAULT_PROFILE_COMPANY_AVATAR;

    return {
      name: organizationName,
      address: organizationAddress,
      type: ORG,
      image: organizationImage,
      source: 'dao',
      roleAccountId: assignment?.accountId ?? undefined,
      roleName: assignment?.roleName ?? undefined,
      canUseStripeConnect: organizationDao?.canUseStripeConnect || false,
      stripeConnectedAccountId: organizationDao?.stripeConnectedAccountId,
    };
  }, [
    organizationAddress,
    organizationDao,
    activeAccountId,
    organizationProfile?.name,
    organizationProfile?.image,
    assignments,
  ]);

  const navigationAccounts = useMemo<DashboardNavAccount[]>(() => {
    const accounts: DashboardNavAccount[] = [];

    // Add personal account if it exists
    if (activeAccount) {
      accounts.push({
        id: activeAccount.id ?? activeAccount.addr ?? personalResolvedAddress,
        name: activeAccount.name || '',
        address: personalResolvedAddress,
        type: activeAccount.type === 'ORGANIZATION' ? ORG : USER,
        image: activeAccount.image ?? undefined,
        source: 'auth',
        canUseStripeConnect: privActiveAccount?.can_use_stripe_connect || false,
        stripeConnectedAccountId: activeAccount.stripeConnectedAccountId,
      });
    }

    // Add organization account if it exists
    if (organizationAccount) {
      accounts.push(organizationAccount);
    }

    return accounts;
  }, [
    activeAccount,
    organizationAccount,
    personalResolvedAddress,
    privActiveAccount?.can_use_stripe_connect,
  ]);

  const selectedAccount = useMemo<DashboardNavAccount | undefined>(() => {
    if (isOrganizationDashboard) {
      return (
        organizationAccount ??
        navigationAccounts.find(account => account.source === 'auth') ??
        navigationAccounts[0]
      );
    }

    return (
      navigationAccounts.find(account => account.source === 'auth') ??
      navigationAccounts[0]
    );
  }, [isOrganizationDashboard, navigationAccounts, organizationAccount]);

  useEffect(() => {
    // Only redirect if we're sure there's no org account and loading is complete
    if (
      isOrganizationDashboard &&
      !organizationAccount &&
      !loading &&
      !isOrgDataLoading
    ) {
      navigate('/dashboard', { replace: true });
    }
  }, [
    isOrganizationDashboard,
    organizationAccount,
    loading,
    isOrgDataLoading,
    navigate,
  ]);

  const organizationRole = useMemo(() => {
    if (!isOrganizationDashboard || selectedAccount?.type !== ORG)
      return undefined;

    return selectedAccount?.roleName;
  }, [
    isOrganizationDashboard,
    selectedAccount?.type,
    selectedAccount?.roleName,
  ]);

  const isOrganizationOwner = organizationRole === ROLE_OWNER;
  const isOrganizationAdmin = organizationRole === ROLE_ADMIN;
  const isOrganizationEditor = organizationRole === ROLE_EDITOR;
  const isOrganizationViewer = organizationRole === ROLE_VIEWER;

  const dashboardAccountAddress = isOrganizationDashboard
    ? organizationAccount?.address ?? selectedAccount?.address
    : loginDisabled
    ? wallet?.address
    : activeAccount?.addr;

  const dashboardAccountId = isOrganizationDashboard
    ? undefined
    : activeAccountId ?? undefined;

  const personalDashboardAddress = loginDisabled
    ? wallet?.address
    : activeAccount?.addr;
  const organizationDashboardAddress = organizationAccount?.address;

  const personalProfileItems = useProfileItems({
    address: personalDashboardAddress,
  });
  const organizationProfileItems = useProfileItems({
    address: organizationDashboardAddress,
  });
  const { isCreditClassCreator, isIssuer, showCreditClasses } =
    isOrganizationDashboard ? organizationProfileItems : personalProfileItems;

  const { adminProjects } = useFetchProjectByAdmin({
    adminAccountId: dashboardAccountId,
    adminAddress: dashboardAccountAddress,
    keepUnpublished: true,
  });
  const hasProjects = !!adminProjects && adminProjects.length > 0;

  const {
    batchesWithSupply: personalBatchesWithSupply,
    isLoadingBatches: personalBatchesLoading,
  } = useFetchPaginatedBatches({
    address: personalDashboardAddress ?? wallet?.address,
    // useFetchPaginatedBatches is quite generic so it fetches all batches if no address is provided
    // so in case the current user account has not wallet address, we need to disable the fetch
    forceAddress: true,
  });
  const {
    batchesWithSupply: organizationBatchesWithSupply,
    isLoadingBatches: organizationBatchesLoading,
  } = useFetchPaginatedBatches({
    address: organizationDashboardAddress,
    // useFetchPaginatedBatches is quite generic so it fetches all batches if no address is provided
    // so in case the current user account has not wallet address, we need to disable the fetch
    forceAddress: true,
  });

  const personalHasCreditBatches =
    personalBatchesWithSupply && personalBatchesWithSupply.length > 0;
  const organizationHasCreditBatches =
    organizationBatchesWithSupply && organizationBatchesWithSupply.length > 0;

  const hasCreditBatches = isOrganizationDashboard
    ? organizationHasCreditBatches
    : personalHasCreditBatches;

  const getSwitchDashboardPath = (targetIsOrg: boolean) => {
    const fromBase = isOrganizationDashboard
      ? orgDashboardBasePath
      : personalDashboardBasePath;
    const toBase = targetIsOrg
      ? orgDashboardBasePath
      : personalDashboardBasePath;
    const rawSuffix = pathname.startsWith(fromBase)
      ? pathname.slice(fromBase.length)
      : '';
    const suffix = rawSuffix.replace(/^\/+/, '').replace(/\/+$/, '');
    if (!suffix) return toBase;

    const section = suffix.split('/')[0];
    const targetProfileItems = targetIsOrg
      ? organizationProfileItems
      : personalProfileItems;
    const targetHasCreditBatches =
      targetProfileItems.isIssuer ||
      (targetIsOrg ? organizationHasCreditBatches : personalHasCreditBatches);
    const targetCreditBatchesLoading =
      (targetIsOrg ? organizationBatchesLoading : personalBatchesLoading) ||
      targetProfileItems.isLoadingIsIssuer;
    const targetHasCreditClasses = targetProfileItems.showCreditClasses;
    const targetCreditClassesLoading =
      targetProfileItems.isLoadingCreditClasses;
    const isUnsupported = targetIsOrg
      ? section === 'settings' || section === 'my-orders'
      : section === 'members';

    const isProjectSpecificRoute =
      section === 'projects' && suffix.split('/').length > 1;

    const shouldFallback =
      isUnsupported ||
      isProjectSpecificRoute ||
      (section === 'credit-batches' &&
        !targetHasCreditBatches &&
        !targetCreditBatchesLoading) ||
      (section === 'credit-classes' &&
        !targetHasCreditClasses &&
        !targetCreditClassesLoading) ||
      (section === 'sell-orders' &&
        !targetIsOrg &&
        !hasOrders &&
        !ordersLoading);

    if (shouldFallback) return `${toBase}/portfolio`;

    return `${toBase}/${suffix}`;
  };

  const onAccountSelect = (address: string) => {
    const target = navigationAccounts.find(
      account => account.address === address,
    );
    if (!target) return;

    const targetIsOrg = target.type === ORG;
    if (targetIsOrg !== isOrganizationDashboard) {
      navigate(getSwitchDashboardPath(targetIsOrg));
    }

    setMobileMenuOpen(false);
  };

  const resolvedAddress = useMemo(() => {
    if (selectedAccount?.address) {
      return selectedAccount.address;
    }
    return personalResolvedAddress;
  }, [personalResolvedAddress, selectedAccount]);

  const dashboardContextValue = useMemo(
    () => ({
      isCreditClassCreator,
      isIssuer,
      sanityProfilePageData,
      selectedAccount,
      isOrganizationDashboard,
      selectedAccountAddress: selectedAccount?.address ?? wallet?.address,
      organizationRole,
      organizationDaoAddress: organizationAccount?.address ?? undefined,
      organizationRbamAddress: organizationDao?.daoRbamAddress ?? undefined,
      organizationProfile: organizationProfile ?? null,
      isOrganizationOwner,
      isOrganizationAdmin,
      isOrganizationEditor,
      isOrganizationViewer,
      feeGranter: isOrganizationDashboard
        ? organizationAccount?.address
        : undefined,
      onConnectWalletClick: openConnectWalletModal,
    }),
    [
      isCreditClassCreator,
      isIssuer,
      sanityProfilePageData,
      selectedAccount,
      isOrganizationDashboard,
      organizationAccount?.address,
      organizationDao?.daoRbamAddress,
      organizationProfile,
      organizationRole,
      isOrganizationOwner,
      isOrganizationAdmin,
      isOrganizationEditor,
      isOrganizationViewer,
      wallet?.address,
      openConnectWalletModal,
    ],
  );

  const portfolioTabs = useMemo(
    () =>
      getPortfolioTabs({
        portfolioLabel: _(PORTFOLIO),
        bridgeLabel: _(BRIDGE),
        basePath: dashboardBasePath,
      }),
    [_, dashboardBasePath],
  );

  const activePortfolioTab = useMemo(
    () => getActivePortfolioTab(portfolioTabs, pathname),
    [portfolioTabs, pathname],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  const viewProfileAccount = useMemo<Pick<
    Account,
    'addr' | 'id' | 'name' | 'type' | 'image'
  > | null>(() => {
    if (selectedAccount?.type === ORG) {
      return {
        id: selectedAccount.roleAccountId ?? selectedAccount.id,
        addr: selectedAccount.address ?? '',
        name: selectedAccount.name || '',
        type: AccountType.Organization,
        image: selectedAccount.image,
      };
    }
    if (activeAccount) {
      return {
        id: activeAccount.id,
        addr: activeAccount.addr,
        name: activeAccount.name,
        type: activeAccount.type,
        image: activeAccount.image,
      };
    }
    return null;
  }, [selectedAccount, activeAccount]);

  const { orders, isLoading: ordersLoading } = useOrders();
  const hasOrders = orders && orders.length > 0;

  const { hasAnyBridgeCredits, isLoading: bridgeLoading } =
    useBridgeAvailability(dashboardAccountAddress ?? wallet?.address);

  if (!activeAccount && !wallet?.address && !privActiveAccount) return null;

  const hasWalletAddress = !!wallet?.address;

  const headerWallet =
    selectedAccount?.type === ORG ? selectedAccount.address : wallet?.address;

  const headerHasWalletAddress =
    selectedAccount?.type === ORG
      ? !!selectedAccount?.address
      : hasWalletAddress;

  const headerActiveAccount: AccountOption =
    selectedAccount ??
    (activeAccount
      ? {
          id: activeAccount.id ?? activeAccount.addr ?? personalResolvedAddress,
          name: activeAccount.name || '',
          address: resolvedAddress || personalResolvedAddress,
          type: activeAccount.type === 'ORGANIZATION' ? ORG : USER,
          image: activeAccount.image ?? undefined,
        }
      : {
          id: personalResolvedAddress,
          name: '',
          address: resolvedAddress || personalResolvedAddress,
          type: USER,
          image: undefined,
        });

  return (
    <>
      <NavigationProvider collapsed={collapsed}>
        <div className="bg-grey-100 min-h-screen">
          <div className="relative md:flex md:min-h-screen">
            {/* Mobile Header */}
            <DashboardNavigationMobileHeader
              activeAccount={headerActiveAccount}
              onMenuClick={() => setMobileMenuOpen(true)}
              mobileMenuOpen={mobileMenuOpen}
            />

            {/* Mobile overlay with blur */}
            {mobileMenuOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Left sidebar navigation */}
            <div className="md:sticky md:top-0 md:h-screen">
              <DashboardNavigation
                isOrganizationDashboard={isOrganizationDashboard}
                collapsed={collapsed}
                onToggleCollapse={setCollapsed}
                currentPath={section ?? ''}
                onNavItemClick={onNavClick}
                isIssuer={isIssuer}
                showCreditClasses={showCreditClasses}
                loginDisabled={loginDisabled}
                hasWalletAddress={headerHasWalletAddress}
                wallet={headerWallet}
                hasProjects={hasProjects}
                hasOrders={
                  !isOrganizationDashboard && !ordersLoading && hasOrders
                }
                hasCreditBatches={hasCreditBatches}
                canEditOrg={!isOrganizationViewer}
                mobileMenuOpen={mobileMenuOpen}
                onLogout={handleLogout}
                onCloseMobile={() => setMobileMenuOpen(false)}
                onExitClick={() => {
                  setIsWarningModalOpen(undefined);
                  router.push('/');
                  setMobileMenuOpen(false);
                }}
                hasOrganization={!!organizationAccount}
                onCreateOrganization={() => {
                  setMobileMenuOpen(false);
                  createOrganization();
                }}
                unfinalizedOrgCreation={unfinalizedOrgCreation}
                unfinalizedOrgName={unfinalizedOrgName}
                onFinishOrgCreation={() => {
                  setMobileMenuOpen(false);
                  finishOrgCreation();
                }}
                header={{
                  activeAccount: headerActiveAccount,
                  accounts: navigationAccounts,
                  onAccountSelect: (address: string) => {
                    setIsWarningModalOpen(undefined);
                    onAccountSelect(address);
                    setMobileMenuOpen(false);
                  },
                  onViewProfileClick: (path: string) => {
                    setIsWarningModalOpen(undefined);
                    router.push(path);
                    setMobileMenuOpen(false);
                  },
                }}
              />
            </div>

            {/* Content area */}
            <div
              className={cn(
                'flex-1 min-w-0 w-full md:w-auto md:pt-0 pt-[25px] transition-all duration-300',
                mobileMenuOpen && 'md:blur-0 blur-sm',
              )}
            >
              <div
                className={cn(
                  'px-10 md:px-30 2xl:mx-auto',
                  pathname.includes('/manage')
                    ? 'xl:px-[111px] pt-20 pb-25 md:pb-40'
                    : 'py-25 md:py-40',
                  section === 'profile' || section === 'settings'
                    ? 'max-w-[767px]'
                    : 'max-w-[1400px]',
                )}
              >
                <div
                  className={cn(
                    'w-full flex flex-col items-center',
                    section ? 'flex' : 'hidden',
                  )}
                >
                  {/* Header section - hide completely on manage pages */}
                  {!pathname.includes('/manage') && (
                    <div className="w-full h-50 my-25 md:mt-0 lg:my-0 flex justify-between items-center">
                      <div className="flex flex-col">
                        {/* Mobile-only subtitle */}
                        <div className="block md:hidden mb-2">
                          <span className="font-muli font-extrabold text-[10px] leading-[100%] tracking-[1px] uppercase text-sc-text-sub-header">
                            {isOrganizationDashboard
                              ? _(ORGANIZATION_DASHBOARD)
                              : section === 'settings'
                              ? _(PERSONAL_ACCOUNT)
                              : _(PERSONAL_DASHBOARD)}
                          </span>
                        </div>
                        {/* Main title */}
                        <Title
                          variant="h1"
                          className="text-[21px] md:text-[32px] leading-[1.4]"
                        >
                          {pathname.includes('/portfolio')
                            ? _(PORTFOLIO)
                            : startCase(section)}
                        </Title>
                      </div>

                      {(section === 'credit-classes' ||
                        section === 'projects' ||
                        section === 'portfolio' ||
                        section === 'credit-batches' ||
                        section === 'profile' ||
                        section === 'members') && (
                        <ViewProfileButton
                          setIsWarningModalOpen={setIsWarningModalOpen}
                          section={section}
                          activeAccount={viewProfileAccount}
                          hasProjects={hasProjects}
                          hasCreditClasses={showCreditClasses}
                          hasCreditBatches={hasCreditBatches}
                        />
                      )}
                    </div>
                  )}

                  {/* Portfolio tabs section - only show if user has bridge credits */}
                  {!bridgeLoading &&
                    hasAnyBridgeCredits &&
                    (section === 'portfolio' ||
                      pathname.includes('/portfolio/bridge')) && (
                      <div className="w-full mb-20 md:mb-8 lg:mb-0">
                        <IconTabs
                          aria-label={_(PORTFOLIO_TABS_ARIA_LABEL)}
                          tabs={portfolioTabs}
                          activeTab={activePortfolioTab}
                          linkComponent={Link}
                          mobileFullWidth
                        />
                      </div>
                    )}

                  <WithLoader isLoading={accountChanging || loading}>
                    <div
                      className={cn(
                        'border border-grey-200 bg-grey-100 w-full',
                        !pathname.includes('/manage') &&
                          'lg:mt-30 min-h-[520px]',
                      )}
                    >
                      <Outlet context={dashboardContextValue} />
                    </div>
                  </WithLoader>
                </div>
              </div>
            </div>
          </div>

          <SaveChangesWarningModal
            open={!!isWarningModalOpen}
            title={_(DISCARD_CHANGES_TITLE)}
            bodyText={_(DISCARD_CHANGES_BODY)}
            buttonText={_(DISCARD_CHANGES_BUTTON)}
            navigate={() => {
              if (isWarningModalOpen) navigate(isWarningModalOpen);
              isDirtyRef.current = false;
            }}
            onClose={() => {
              setIsWarningModalOpen(undefined);
            }}
          />
        </div>
      </NavigationProvider>
      <AccountConnectWalletModal
        open={isConnectWalletModalOpen}
        onClose={() => {
          clearConnectWalletFlow();
          handleConnectWalletModalClose();
        }}
        title={_(CONNECT_TO_KEPLR_ORGANIZATION)}
        description={connectWalletDescription}
        wallets={[
          {
            ...walletsUiConfig[0],
            onClick: () => {
              setShouldResumeConnectWalletFlow(true);
              handleWalletConnect();
            },
          },
        ]}
        state={modalState}
      />
      <ConnectWalletFlow
        isConnectModalOpened={
          isConnectWalletModalOpen || shouldResumeConnectWalletFlow
        }
        onConnectModalClose={() => {
          handleConnectWalletModalClose();
        }}
        clearConnectWalletFlow={clearConnectWalletFlow}
      />
    </>
  );
};
