import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { startCase } from 'lodash';

import { Flex } from 'web-components/src/components/box';
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

import {
  BRIDGE,
  PERSONAL_ACCOUNT,
  PERSONAL_DASHBOARD,
  PORTFOLIO,
  PORTFOLIO_TABS_ARIA_LABEL,
} from './Dashboard.constants';
import { getActivePortfolioTab, getPortfolioTabs } from './Dashboard.utils';
import { ViewProfileButton } from './Dashboard.ViewProfileButton';
import { usePathSection } from './hooks/usePathSection';

export const Dashboard = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { accountChanging, disconnect, loginDisabled } = useWallet();
  const { loading, activeAccount, authenticatedAccounts } = useAuth();

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = usePathSection();

  const { isCreditClassCreator, isProjectAdmin, isIssuer } = useProfileItems(
    {},
  );

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

  if (!activeAccount) return null;

  return (
    <div className="bg-grey-100">
      <div className="relative md:flex md:min-h-screen">
        {/* Mobile Header */}
        <DashboardNavigationMobileHeader
          activeAccount={{
            ...activeAccount,
            address: activeAccount.addr ?? '',
            type: activeAccount.type === 'USER' ? 'user' : 'org',
            image: activeAccount.image || '',
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
            currentPath={section ?? ''}
            onNavItemClick={onNavClick}
            isIssuer={isIssuer}
            loginDisabled={loginDisabled} // Add this prop
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
                ...activeAccount,
                address: activeAccount.addr ?? '',
                type: activeAccount.type === 'USER' ? 'user' : 'org',
                image: activeAccount.image || '',
              },
              accounts: (authenticatedAccounts || []).map(account => ({
                id: account?.id,
                name: account?.name || '',
                address: account?.addr || '',
                type: account?.type === 'USER' ? 'user' : 'org',
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
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={cn('w-full', section ? 'flex' : 'hidden')}
            >
              <Flex
                justifyContent="space-between"
                alignContent="center"
                className="w-full h-50 my-25 md:my-0"
              >
                <div className="flex flex-col">
                  {/* Mobile-only subtitle */}
                  <div className="block md:hidden mb-2">
                    <span
                      style={{
                        fontFamily: 'Mulish',
                        fontWeight: 800,
                        fontSize: '10px',
                        lineHeight: '100%',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                      className="text-sc-text-sub-header"
                    >
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
                  section === 'credit-batches' || // Add this line
                  section === 'profile') && (
                  <ViewProfileButton
                    setIsWarningModalOpen={setIsWarningModalOpen}
                    section={section}
                    activeAccount={
                      activeAccount
                        ? {
                            ...activeAccount,
                            addr: activeAccount.addr ?? undefined,
                          }
                        : undefined
                    }
                  />
                )}
              </Flex>

              {/* Portfolio tabs section */}
              {(section === 'portfolio' ||
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
            </Flex>
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
  );
};
