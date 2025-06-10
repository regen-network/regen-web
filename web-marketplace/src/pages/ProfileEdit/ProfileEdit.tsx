import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom, useAtom } from 'jotai';
import { startCase } from 'lodash';

import { Flex } from 'web-components/src/components/box';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { DISCARD_CHANGES_TITLE } from 'lib/constants/shared.constants';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { useWallet } from 'lib/wallet/wallet';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import WithLoader from 'components/atoms/WithLoader';
import { DashboardNavigation } from 'components/organisms/DashboardNavigation';
import { useShowOrders } from 'components/organisms/RegistryLayout/hooks/useShowOrders';
import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';

import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
} from '../../lib/constants/shared.constants';
import { usePathSection } from './hooks/usePathSection';
import { ViewProfileButton } from './ProfileEdit.ViewProfile';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';
import { client as sanityClient } from 'lib/clients/sanity';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import BridgeIcon  from 'web-components/src/components/icons/BridgeIcon';
import { isBridgeEnabled } from 'lib/ledger';
import { Link } from 'components/atoms';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';

export const ProfileEdit = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { accountChanging, loginDisabled } = useWallet();
  const { loading, activeAccount, authenticatedAccounts } = useAuth();
  const showOrders = useShowOrders();

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const setIsProfileEditDirtyref = useSetAtom(isProfileEditDirtyRef);
  const isDirtyRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = usePathSection(); // This should return 'portfolio' for both /portfolio and /portfolio/bridge

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: true,
    }),
  );

  const {
    showCreditClasses,
    isCreditClassCreator,
    isProjectAdmin,
    isIssuer,
    showProjects,
  } = useProfileItems({});

  const { data: sanityProfilePageData } = useQuery(
    getAllProfilePageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const onNavClick = (sectionName: string): void => {
    const isFormDirty = isDirtyRef.current;
    const path = `/dashboard/${sectionName.replace(' ', '-')}`;
    if (isFormDirty) {
      setIsWarningModalOpen(path);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (isDirtyRef && setIsProfileEditDirtyref) {
      setIsProfileEditDirtyref(isDirtyRef);
    }
  }, [isDirtyRef, setIsProfileEditDirtyref]);

  function onAccountSelect(id: string) {
    throw new Error('Function not implemented.');
  }
  
  // Create the context data to pass down
  const dashboardContextValue = useMemo(() => ({
    isCreditClassCreator,
    isProjectAdmin,
    isIssuer,
    sanityProfilePageData,
  }), [isCreditClassCreator, isProjectAdmin, isIssuer, sanityProfilePageData]);

  const { wallet, isConnected } = useWallet();

  // Define the portfolio tabs with icons
  const portfolioTabs: IconTabProps[] = useMemo(() => [
    {
      label: _('Ecocredits'),
      href: '/dashboard/portfolio',
      icon: <CreditsIcon fontSize="small" linearGradient />,
    },
    {
      label: _('Bridge'), 
      href: '/dashboard/portfolio/bridge',
      icon: <BridgeIcon linearGradient />,
    },
  ], [_]);

  // Update the active tab calculation
  const activePortfolioTab = Math.max(
    portfolioTabs.findIndex(tab => {
      if (tab.href === '/dashboard/portfolio/bridge') {
        // Check for bridge first (more specific path)
        return pathname.includes('/dashboard/portfolio/bridge');
      }
      if (tab.href === '/dashboard/portfolio') {
        // Only match exact portfolio path, not bridge sub-paths
        return pathname === '/dashboard/portfolio';
      }
      return false;
    }),
    0,
  );

  return (
    <div className="bg-grey-100">
      {/* Outer container for the entire page layout */}
      <div className="relative lg:flex lg:min-h-screen">
        {/* Left sidebar navigation - overlay on mobile, sidebar on desktop */}
        {activeAccount && (
            <div className="lg:sticky lg:top-0 lg:h-screen">
              <DashboardNavigation
                currentPath={pathname}
                onNavItemClick={onNavClick}
                isIssuer={isIssuer}
                onLogout={() => {
                  setIsWarningModalOpen(undefined);
                  navigate('/logout');
                }}
                onCloseMobile={() => {
                  setIsWarningModalOpen(undefined);
                  navigate('/dashboard');
                }}
                onExitClick={() => {
                  setIsWarningModalOpen(undefined);
                  navigate('/');
                }}
                header={{
                  activeAccount: {
                    ...activeAccount,
                    address: activeAccount.addr ?? '',
                    type: activeAccount.type === 'USER' ? 'user' : 'org',
                    image: activeAccount.image || '',
                  },
                  accounts: (authenticatedAccounts || []).map((account) => ({
                    id: account?.id,
                    name: account?.name || '',
                    address: account?.addr || '',
                    type: account?.type === 'USER' ? 'user' : 'org', 
                    image: account?.image || '',
                  })),
                  onAccountSelect: (id: string) => {
                    setIsWarningModalOpen(undefined);
                    onAccountSelect(id);
                  },
                  onViewProfileClick: (path: string) => {
                    setIsWarningModalOpen(undefined);
                    navigate(`${path}`);
                  },
                }}
              />
            </div>
        )}
        
        {/* Content area - full width, overlapped by sidebar on mobile */}
        <div className="flex-1 min-w-0 w-full lg:w-auto">
          {/* Content container with conditional max width */}
          <div className={cn(
            "mx-auto px-30 py-40",
            section === 'profile' || section === 'settings' ? "max-w-[767px]" : "max-w-[1400px]"
          )}>
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className={cn(
                'w-full',
                section ? 'flex' : 'hidden',
              )}
            >
              <Flex
                justifyContent="space-between"
                className="my-10 w-full h-50"
              >
                <Title variant="h1" className="text-[32px] leading-[1.4]">
                  {pathname.includes('/portfolio') ? 'Portfolio' : startCase(section)}
                </Title>
                {section === 'profile' && (
                  <ViewProfileButton
                    setIsWarningModalOpen={setIsWarningModalOpen}
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

              {/* Add conditional tabs for Portfolio section */}
              {(section === 'portfolio' || pathname.includes('/portfolio/bridge')) && (
                <div className="w-full mb-8">
                  <IconTabs
                    aria-label="portfolio tabs"
                    tabs={portfolioTabs}
                    activeTab={activePortfolioTab}
                    linkComponent={Link}
                    mobileFullWidth
                  />
                </div>
              )}

              <WithLoader isLoading={accountChanging || loading}>
                <div className="rounded-md border border-grey-200 bg-grey-0 lg:mt-30 w-full">
                  {/* Pass context to child routes */}
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
