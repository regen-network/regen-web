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
import { UserMenuItems } from 'web-components/lib/components/header/components/UserMenuItems';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { truncate } from 'web-components/lib/utils/truncate';

import { getPartiesByAccountIdQuery } from 'lib/queries/react-query/registry-server/graphql/getPartiesByAccountIdById/getPartiesByAccountIdQuery';
import { useWallet } from 'lib/wallet/wallet';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

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
  const {
    wallet,
    loaded,
    disconnect,
    isConnected,
    partyByAddr,
    accountId,
    handleAddAddress,
  } = useWallet();
  const theme = useTheme<Theme>();
  const headerColors = useMemo(() => getHeaderColors(theme), [theme]);
  const isTransparent = useMemo(() => getIsTransparent(pathname), [pathname]);
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname]);
  const userMenuItems = useMemo(
    () => getUserMenuItems({ linkComponent: RegistryNavLink, pathname, theme }),
    [pathname, theme],
  );

  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const color = headerColors[pathname]
    ? headerColors[pathname]
    : theme.palette.primary.light;

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: partiesByAccountId } = useQuery(
    getPartiesByAccountIdQuery({
      client: graphqlClient,
      id: accountId,
      enabled: !!accountId && !!graphqlClient,
    }),
  );

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
              <UserMenuItems
                address={truncate(wallet?.address)}
                avatar={party?.image ? party?.image : defaultAvatar}
                disconnect={disconnect}
                pathname={pathname}
                linkComponent={RegistryNavLink}
                userMenuItems={userMenuItems}
                profiles={
                  partiesByAccountId?.accountById?.partiesByAccountId?.nodes?.map(
                    party => ({
                      name: party?.name ? party?.name : DEFAULT_NAME,
                      profileImage: party?.image
                        ? party?.image
                        : getDefaultAvatar(party),
                      address: truncate(party?.walletByWalletId?.addr),
                      selected:
                        wallet?.address === party?.walletByWalletId?.addr,
                    }),
                  ) || []
                }
                addAddress={handleAddAddress}
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
