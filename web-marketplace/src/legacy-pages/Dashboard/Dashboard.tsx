import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useProfileItems } from 'legacy-pages/Dashboard/hooks/useProfileItems';
import { useOrders } from 'legacy-pages/Orders/hooks/useOrders';
import { startCase } from 'lodash';

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
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from 'lib/constants/shared.constants';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { DashboardNavigation } from 'components/organisms/DashboardNavigation';
import { DashboardNavigationMobileHeader } from 'components/organisms/DashboardNavigation/DashboardNavigation.MobileHeader';
import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { NavigationProvider } from '../../components/organisms/DashboardNavigation/contexts/NavigationContext';
import {
  BRIDGE,
  ORGANIZATION_DASHBOARD,
  PERSONAL_ACCOUNT,
  PERSONAL_DASHBOARD,
  PORTFOLIO,
  PORTFOLIO_TABS_ARIA_LABEL,
} from './Dashboard.constants';
import {
  getActivePortfolioTab,
  getPortfolioTabs,
  getWalletAddress,
} from './Dashboard.utils';
import { ViewProfileButton } from './Dashboard.ViewProfileButton';
import { useBridgeAvailability } from './hooks/useBridgeAvailabilty';
import { usePathSection } from './hooks/usePathSection';
import { useFetchProjectByAdmin } from './MyProjects/hooks/useFetchProjectsByAdmin';

type DashboardNavAccount = AccountOption & {
  source: 'auth' | 'dao';
  roleAccountId?: string;
  roleName?: string;
  onChainRoleId?: string;
};

export const Dashboard = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { accountChanging, disconnect, loginDisabled, wallet } = useWallet();
  const {
    loading,
    activeAccount,
    activeAccountId,
    authenticatedAccounts,
    privActiveAccount,
  } = useAuth();

  const organizationDao = useDaoOrganization();

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isOrganizationDashboard = pathname.startsWith(
    '/dashboard/organization',
  );
  const dashboardBasePath = isOrganizationDashboard
    ? '/dashboard/organization'
    : '/dashboard';
  const section = usePathSection();

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
      navigate('/');
    } catch (error) {
      navigate('/');
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

  const organizationAccount = useMemo<DashboardNavAccount | undefined>(() => {
    if (!organizationDao) return undefined;
    const organizationAddress = organizationDao.address ?? '';
    if (!organizationAddress) return undefined;

    const assignment = organizationDao.assignmentsByDaoAddress?.nodes?.find(
      node => node?.accountId === activeAccountId,
    );

    const assignedAccount =
      organizationDao.accountsByAssignmentDaoAddressAndAccountId?.nodes?.find(
        account => account?.id === assignment?.accountId,
      );

    const organizationName =
      assignedAccount?.name ||
      organizationDao.organizationByDaoAddress?.name ||
      organizationAddress;

    return {
      id: organizationAddress,
      name: organizationName,
      address: organizationAddress,
      type: 'org' as const,
      image: assignedAccount?.image ?? undefined,
      source: 'dao',
      roleAccountId: assignment?.accountId ?? undefined,
      roleName: assignment?.roleName ?? undefined,
      onChainRoleId: assignment?.onChainRoleId
        ? String(assignment.onChainRoleId)
        : undefined,
    };
  }, [organizationDao, activeAccountId]);

  const authAccounts = useMemo<DashboardNavAccount[]>(() => {
    const mapped =
      authenticatedAccounts?.map(account => ({
        id: account?.id ?? account?.addr ?? undefined,
        name: account?.name || '',
        address: account?.addr || privActiveAccount?.email || undefined,
        type:
          account?.type === 'ORGANIZATION'
            ? ('org' as const)
            : ('user' as const),
        image: account?.image ?? undefined,
        source: 'auth' as const,
      })) ?? [];

    const filtered = mapped.filter(account => account.id || account.address);

    if (activeAccount) {
      const personalId =
        activeAccount.id ?? activeAccount.addr ?? personalResolvedAddress ?? '';
      const exists = filtered.some(account => account.id === personalId);

      if (!exists) {
        filtered.unshift({
          id: personalId,
          name: activeAccount.name || '',
          address: personalResolvedAddress,
          type:
            activeAccount.type === 'ORGANIZATION'
              ? ('org' as const)
              : ('user' as const),
          image: activeAccount.image ?? undefined,
          source: 'auth',
        });
      }
    } else if (filtered.length === 0 && personalResolvedAddress) {
      filtered.unshift({
        id: personalResolvedAddress,
        name: '',
        address: personalResolvedAddress,
        type: 'user' as const,
        image: undefined,
        source: 'auth',
      });
    }

    return filtered;
  }, [
    authenticatedAccounts,
    activeAccount,
    personalResolvedAddress,
    privActiveAccount?.email,
  ]);

  const navigationAccounts = useMemo<DashboardNavAccount[]>(() => {
    const list: DashboardNavAccount[] = [...authAccounts];
    if (organizationAccount) {
      const exists = list.some(
        account => account.id === organizationAccount.id,
      );
      if (!exists) {
        list.push(organizationAccount);
      }
    }
    return list;
  }, [authAccounts, organizationAccount]);

  useEffect(() => {
    if (isOrganizationDashboard && !organizationAccount && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isOrganizationDashboard, organizationAccount, loading, navigate]);

  const personalAccountId = useMemo(() => {
    if (activeAccount?.id) return activeAccount.id;
    if (activeAccount?.addr) return activeAccount.addr;
    if (personalResolvedAddress) return personalResolvedAddress;
    const firstAuth = authAccounts.find(account => account.source === 'auth');
    return firstAuth?.id ?? '';
  }, [
    activeAccount?.id,
    activeAccount?.addr,
    personalResolvedAddress,
    authAccounts,
  ]);

  const selectedAccountId = isOrganizationDashboard
    ? organizationAccount?.id ?? ''
    : personalAccountId;

  const selectedAccount = useMemo<DashboardNavAccount | undefined>(() => {
    if (!selectedAccountId) return navigationAccounts[0];
    return (
      navigationAccounts.find(account => account.id === selectedAccountId) ??
      navigationAccounts.find(account => account.source === 'auth') ??
      navigationAccounts[0]
    );
  }, [navigationAccounts, selectedAccountId]);

  const dashboardAccountAddress = isOrganizationDashboard
    ? organizationAccount?.address ?? selectedAccount?.address
    : loginDisabled
    ? wallet?.address
    : activeAccount?.addr;

  const dashboardAccountId = isOrganizationDashboard
    ? undefined
    : activeAccountId ?? undefined;

  const { isCreditClassCreator, isProjectAdmin, isIssuer, showCreditClasses } =
    useProfileItems({
      address: dashboardAccountAddress,
      accountId: dashboardAccountId,
    });

  const projects = useFetchProjectByAdmin({
    adminAccountId: dashboardAccountId,
    adminAddress: dashboardAccountAddress,
    keepUnpublished: true,
  });

  const hasProjects = projects?.adminProjects;

  const { batchesWithSupply } = useFetchPaginatedBatches({
    address: dashboardAccountAddress ?? wallet?.address,
  });
  const hasCreditBatches = batchesWithSupply && batchesWithSupply.length > 0;

  const onAccountSelect = (id: string) => {
    const target = navigationAccounts.find(account => account.id === id);
    if (!target) return;

    if (target.type === 'org') {
      if (!isOrganizationDashboard) {
        navigate('/dashboard/organization');
      }
    } else {
      if (isOrganizationDashboard) {
        navigate('/dashboard');
      }
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
      isProjectAdmin,
      isIssuer,
      sanityProfilePageData,
      selectedAccountId,
      selectedAccount: selectedAccount
        ? {
            id: selectedAccount.id,
            name: selectedAccount.name,
            address: selectedAccount.address,
            type: selectedAccount.type,
            image: selectedAccount.image,
          }
        : undefined,
      isOrganizationDashboard,
      selectedAccountRoleName: selectedAccount?.roleName,
      selectedAccountOnChainRoleId: selectedAccount?.onChainRoleId,
      selectedAccountAddress: selectedAccount?.address,
      selectedAccountRoleAccountId: selectedAccount?.roleAccountId,
    }),
    [
      isCreditClassCreator,
      isProjectAdmin,
      isIssuer,
      sanityProfilePageData,
      selectedAccountId,
      selectedAccount,
      isOrganizationDashboard,
      selectedAccount?.roleName,
      selectedAccount?.onChainRoleId,
      selectedAccount?.address,
      selectedAccount?.roleAccountId,
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

  const mobileActiveAccount: AccountOption = selectedAccount
    ? {
        id: selectedAccount.id,
        name: selectedAccount.name,
        address: selectedAccount.address,
        type: selectedAccount.type,
        image: selectedAccount.image,
      }
    : activeAccount
    ? {
        id: activeAccount.id ?? activeAccount.addr ?? personalResolvedAddress,
        name: activeAccount.name || '',
        address: resolvedAddress || personalResolvedAddress,
        type: activeAccount.type === 'ORGANIZATION' ? 'org' : 'user',
        image: activeAccount.image ?? undefined,
      }
    : {
        id: personalResolvedAddress,
        name: '',
        address: resolvedAddress || personalResolvedAddress,
        type: 'user',
        image: undefined,
      };

  const viewProfileAccount = useMemo<Pick<
    Account,
    'addr' | 'id' | 'name' | 'type' | 'image'
  > | null>(() => {
    if (selectedAccount?.type === 'org') {
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

  const { orders, isLoading: ordersLoading } = useOrders({
    address: dashboardAccountAddress ?? wallet?.address,
  });
  const hasOrders = orders && orders.length > 0;

  const { hasAnyBridgeCredits, isLoading: bridgeLoading } =
    useBridgeAvailability(dashboardAccountAddress ?? wallet?.address);

  if (!activeAccount && !wallet?.address && !privActiveAccount) return null;

  const hasWalletAddress = !!wallet?.address;

  const headerWallet =
    selectedAccount?.type === 'org' ? selectedAccount.address : wallet?.address;

  const headerHasWalletAddress =
    selectedAccount?.type === 'org'
      ? !!selectedAccount?.address
      : hasWalletAddress;

  return (
    <NavigationProvider collapsed={collapsed}>
      <div className="bg-grey-100 min-h-screen">
        <div className="relative md:flex md:min-h-screen">
          {/* Mobile Header */}
          <DashboardNavigationMobileHeader
            activeAccount={mobileActiveAccount}
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
              collapsed={collapsed}
              onToggleCollapse={setCollapsed}
              currentPath={section ?? ''}
              onNavItemClick={onNavClick}
              isIssuer={isIssuer}
              showCreditClasses={showCreditClasses}
              loginDisabled={loginDisabled}
              hasWalletAddress={headerHasWalletAddress}
              wallet={headerWallet}
              hasProjects={!!hasProjects && hasProjects.length > 0}
              hasOrders={!ordersLoading && hasOrders}
              hasCreditBatches={hasCreditBatches}
              mobileMenuOpen={mobileMenuOpen}
              onLogout={handleLogout}
              onCloseMobile={() => setMobileMenuOpen(false)}
              onExitClick={() => {
                setIsWarningModalOpen(undefined);
                navigate('/');
                setMobileMenuOpen(false);
              }}
              header={{
                activeAccount: mobileActiveAccount,
                accounts: navigationAccounts,
                onAccountSelect: (id: string) => {
                  setIsWarningModalOpen(undefined);
                  onAccountSelect(id);
                  setMobileMenuOpen(false);
                },
                onViewProfileClick: (path: string) => {
                  setIsWarningModalOpen(undefined);
                  navigate(path);
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
                      !pathname.includes('/manage') && 'lg:mt-30 min-h-[520px]',
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
  );
};
