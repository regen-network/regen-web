import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';

import Header from 'web-components/lib/components/header';
import { UserMenuItem } from 'web-components/lib/components/header/components/UserMenuItem';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { truncate } from 'web-components/lib/utils/truncate';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';

import { chainId } from '../../../lib/ledger';
import { RegistryIconLink, RegistryNavLink } from '../../atoms';
import { WalletButton } from '../WalletButton/WalletButton';
import {
  getHeaderColors,
  getIsTransparent,
  getMenuItems,
  getUserMenuItems,
} from './RegistryLayout.config';
import { fullWidthRegExp } from './RegistryLayout.constants';

const RegistryLayoutHeader: React.FC = () => {
  const { pathname } = useLocation();
  const { wallet, loaded, disconnect, isConnected } = useWallet();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname]);
  const userMenuItems = useMemo(
    () => getUserMenuItems({ linkComponent: RegistryNavLink, pathname, theme }),
    [pathname, theme],
  );

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: wallet?.address ?? '',
      enabled: isConnected && !!graphqlClient && !!csrfData,
    }),
  );
  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

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
        borderBottom={false} // TODO: there's some bug where this won't change on routes - hardcoded for now
        fullWidth={fullWidthRegExp.test(pathname)}
        pathname={pathname}
        extras={
          <Box display="flex" justifyContent="center" alignItems="center">
            {chainId && loaded && isConnected && disconnect && (
              <UserMenuItem
                address={truncate(wallet?.address)}
                avatar={party?.image ? party?.image : defaultAvatar}
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={RegistryNavLink}
                userMenuItems={userMenuItems}
              />
            )}
            <WalletButton />
          </Box>
        }
      />
    </>
  );
};

export { RegistryLayoutHeader };
