import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import { getClientConfig } from 'clients/Clients.config';
import { useAtom } from 'jotai';

import Header from 'web-components/src/components/header';
import { UserMenuItems } from 'web-components/src/components/header/components/UserMenuItems';
import { Theme } from 'web-components/src/theme/muiTheme';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
// import { cn } from 'web-components/src/utils/styles/cn';
import { useAuth } from 'lib/auth/auth';
import { client as sanityClient } from 'lib/clients/sanity';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { getAllSanityProjectsQuery } from 'lib/queries/react-query/sanity/getAllProjectsQuery/getAllProjectsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { getWalletAddress } from 'pages/Dashboard/Dashboard.utils';
import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { useFetchAllOffChainProjects } from 'pages/Projects/hooks/useOffChainProjects';
import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink } from '../../atoms';
import { ListProject } from '../ListProject/ListProject';
import { LoginButton } from '../LoginButton/LoginButton';
import { useOnProfileClick } from './hooks/useOnProfileClick';
import { useShowOrders } from './hooks/useShowOrders';
import {
  getBorderBottom,
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getUserMenuItems,
} from './RegistryLayout.config';
import {
  AVATAR_ALT,
  fullWidthRegExp,
  LOGOUT_TEXT,
} from './RegistryLayout.constants';
// import { LanguageSwitcher } from './RegistryLayout.LanguageSwitcher';
import { getAddress, getProfile } from './RegistryLayout.utils';

const RegistryLayoutHeader: React.FC = () => {
  const { _ } = useLingui();
  const { pathname } = useLocation();
  const { activeAccount, privActiveAccount } = useAuth();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { wallet, disconnect, isConnected, loginDisabled, accountByAddr } =
    useWallet();
  const { accountOrWallet, noAccountAndNoWallet } = useAuthData();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const borderBottom = useMemo(() => getBorderBottom(pathname), [pathname]);
  // const isHome = pathname === '/';
  const clientConfig = getClientConfig();

  const { showProjects, showCreditClasses, isIssuer } = useProfileItems({});

  // Sanity projects
  const { data: sanityProjectsData, isFetching: isLoadingSanityProjects } =
    useQuery(
      getAllSanityProjectsQuery({
        sanityClient,
        enabled: !!sanityClient,
        languageCode: selectedLanguage,
      }),
    );

  // OffChainProjects
  const { allOffChainProjects, isAllOffChainProjectsLoading } =
    useFetchAllOffChainProjects({
      sanityProjectsData,
    });

  const prefinanceProjects = allOffChainProjects.filter(
    project => project.projectPrefinancing?.isPrefinanceProject,
  );
  const hasPrefinanceProjects =
    !isLoadingSanityProjects &&
    !isAllOffChainProjectsLoading &&
    prefinanceProjects.length > 0;

  const menuItems = useMemo(
    () => getMenuItems(pathname, _, hasPrefinanceProjects),
    [pathname, _, hasPrefinanceProjects],
  );
  const onProfileClick = useOnProfileClick();

  const showOrders = useShowOrders();

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: !!activeAccount,
    }),
  );

  const savedPaymentInfo = (paymentMethodData?.paymentMethods?.length ?? 0) > 0;

  const userMenuItems = useMemo(
    () =>
      getUserMenuItems({
        linkComponent: RegistryNavLink,
        pathname,
        showCreditClasses,
        isIssuer,
        showProjects,
        isWalletConnected: isConnected,
        loginDisabled,
        onProfileClick,
        savedPaymentInfo,
        showOrders,
        profile: getProfile({
          account: activeAccount ?? accountByAddr,
          privActiveAccount,
          _,
        }),
        _,
      }),
    [
      pathname,
      showCreditClasses,
      isIssuer,
      showProjects,
      isConnected,
      loginDisabled,
      onProfileClick,
      savedPaymentInfo,
      showOrders,
      activeAccount,
      accountByAddr,
      privActiveAccount,
      _,
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
    </>
  );
};

export { RegistryLayoutHeader };
