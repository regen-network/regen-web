import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from 'lib/constants/shared.constants';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { DashboardNavigation } from 'components/organisms/DashboardNavigation';
import { DashboardNavigationMobileHeader } from 'components/organisms/DashboardNavigation/DashboardNavigation.MobileHeader';

import { NavigationProvider } from '../../components/organisms/DashboardNavigation/contexts/NavigationContext';
import {
  BRIDGE,
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
import { useOrdersAvailability } from './hooks/useOrdersAvailability';
import { usePathSection } from './hooks/usePathSection';
import { useFetchProjectByAdmin } from './MyProjects/hooks/useFetchProjectsByAdmin';

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

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = usePathSection();

  const { isCreditClassCreator, isProjectAdmin, isIssuer } = useProfileItems(
    {},
  );
  const projects = useFetchProjectByAdmin({
    adminAccountId: activeAccountId,
    adminAddress: loginDisabled ? wallet?.address : activeAccount?.addr,
    keepUnpublished: true,
  });

  const hasProjects = projects?.adminProjects;

  const walletConnect = !activeAccount && !privActiveAccount;

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
      console.error('Logout failed:', error);
      navigate('/');
    }
  };

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = `/dashboard/${sectionName.replace(' ', '-')}`;
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
    }
  };
  // Placeholder function for account selection logic
  // This should be replaced with actual logic to handle
  // account selection when Org functionality is implemented
  const onAccountSelect = (id: string) => {
    throw new Error('Function not implemented.');
  };

  const dashboardContextValue = useMemo(
    () => ({
      isCreditClassCreator,
      isProjectAdmin,
      isIssuer,
      sanityProfilePageData,
    }),
    [isCreditClassCreator, isProjectAdmin, isIssuer, sanityProfilePageData],
  );

  const portfolioTabs = useMemo(
    () =>
      getPortfolioTabs({
        portfolioLabel: _(PORTFOLIO),
        bridgeLabel: _(BRIDGE),
      }),
    [_],
  );

  const activePortfolioTab = useMemo(
    () => getActivePortfolioTab(portfolioTabs, pathname),
    [portfolioTabs, pathname],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  const resolvedAddress = useMemo(() => {
    const walletAddress = getWalletAddress({ activeAccount, wallet });
    if (walletAddress) return walletAddress;

    return privActiveAccount?.email || '';
  }, [activeAccount, wallet, privActiveAccount?.email]);

  const { hasOrders, isLoading: ordersLoading } = useOrdersAvailability();

  const { hasAnyBridgeCredits, isLoading: bridgeLoading } =
    useBridgeAvailability();

  if (!activeAccount && !wallet?.address && !privActiveAccount) return null;

  const hasWalletAddress = !!wallet?.address;

  return (
    <NavigationProvider collapsed={collapsed}>
      <div className="bg-grey-100 min-h-screen">
        <div className="relative md:flex md:min-h-screen">
          {/* Mobile Header */}
          <DashboardNavigationMobileHeader
            activeAccount={{
              ...activeAccount,
              id: activeAccount?.id ?? '',
              name: activeAccount?.name || '',
              address: resolvedAddress || '',
              type: activeAccount?.type === 'USER' ? 'user' : 'org',
              image: activeAccount?.image || '',
            }}
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
              loginDisabled={loginDisabled}
              hasWalletAddress={hasWalletAddress}
              wallet={wallet?.address}
              walletConnect={walletConnect}
              hasProjects={!!hasProjects && hasProjects.length > 0}
              hasOrders={hasOrders || ordersLoading}
              mobileMenuOpen={mobileMenuOpen}
              onLogout={handleLogout}
              onCloseMobile={() => setMobileMenuOpen(false)}
              onExitClick={() => {
                setIsWarningModalOpen(undefined);
                navigate('/');
                setMobileMenuOpen(false);
              }}
              header={{
                activeAccount: {
                  id: activeAccount?.id ?? '',
                  name: activeAccount?.name || '',
                  address: resolvedAddress,
                  type: activeAccount?.type === 'ORGANIZATION' ? 'org' : 'user',
                  image: activeAccount?.image || '',
                },
                accounts: (authenticatedAccounts || []).map(account => ({
                  id: account?.id ?? '',
                  name: account?.name || '',
                  address: account?.addr || privActiveAccount?.email || '',
                  type: account?.type === 'ORGANIZATION' ? 'org' : 'user',
                  image: account?.image || '',
                })),
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
                'px-10 py-25 md:py-40 md:px-30 2xl:mx-auto',
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
                <div className="w-full h-50 my-25 md:my-0 flex justify-between items-center">
                  <div className="flex flex-col">
                    {/* Mobile-only subtitle */}
                    <div className="block md:hidden mb-2">
                      <span className="font-muli font-extrabold text-[10px] leading-[100%] tracking-[1px] uppercase text-sc-text-sub-header">
                        {section === 'settings'
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
                    section === 'profile') && (
                    <ViewProfileButton
                      setIsWarningModalOpen={setIsWarningModalOpen}
                      section={section}
                      activeAccount={activeAccount}
                      hasProjects={hasProjects}
                    />
                  )}
                </div>

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
                  <div className="rounded-md border border-grey-200 bg-grey-100 lg:mt-30 w-full">
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
