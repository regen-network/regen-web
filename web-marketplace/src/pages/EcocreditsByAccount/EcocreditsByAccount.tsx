import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { isValidAddress } from 'web-components/lib/components/inputs/validation';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { getPartyByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByIdQuery/getPartyByIdQuery';

import { getSocialsLinks } from 'pages/Dashboard/Dashboard.utils';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { Link } from 'components/atoms';

import { ecocreditsByAccountStyles } from './EcocreditsByAccount.styles';

export const EcocreditsByAccount = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const isValidRegenAddress = isValidAddress(accountAddressOrId ?? '', 'regen');
  const location = useLocation();

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: accountAddressOrId ?? '',
      enabled: isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );
  const { data: partyById } = useQuery(
    getPartyByIdQuery({
      client: graphqlClient,
      id: accountAddressOrId ?? '',
      enabled: !isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );

  const party =
    partyByAddr?.walletByAddr?.partyByWalletId ?? partyById?.partyById;
  const defaultAvatar = getDefaultAvatar(party);
  const address = isValidRegenAddress
    ? accountAddressOrId
    : partyById?.partyById?.walletByWalletId?.addr;

  const socialsLinks = useMemo(
    () => getSocialsLinks({ partyByAddr }),
    [partyByAddr],
  );

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: <CreditsIcon fontSize="small" />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
        hidden: !party,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: `/profiles/${accountAddressOrId}/bridge`,
        hidden: !party || import.meta.env.VITE_LEDGER_CHAIN_ID === 'regen-1', // TODO: Hides in PROD - remove when Bridge is ready
      },
    ],
    [accountAddressOrId, party],
  );

  const activeTab = Math.max(
    tabs.findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  return (
    <>
      <ProfileHeader
        name={party?.name ? party?.name : DEFAULT_NAME}
        backgroundImage={party?.bgImage ? party?.bgImage : DEFAULT_PROFILE_BG}
        avatar={party?.image ? party?.image : defaultAvatar}
        infos={{
          addressLink: {
            href: address
              ? getAccountUrl(accountAddressOrId, true)
              : `/profiles/${accountAddressOrId}/portfolio`,
            text: address ? truncate(accountAddressOrId) : '',
          },
          description: party?.description?.trimEnd() ?? '',
          socialsLinks,
        }}
        editLink=""
        variant={party?.type ? profileVariantMapping[party.type] : 'individual'}
        LinkComponent={Link}
      />
      <Box sx={{ backgroundColor: 'grey.50' }}>
        <Section sx={{ root: { pt: { xs: 15 } } }}>
          <IconTabs
            aria-label="public profile tabs"
            tabs={tabs}
            linkComponent={Link}
            activeTab={activeTab}
            mobileFullWidth
          />
          <Flex sx={{ ...ecocreditsByAccountStyles.padding }}>
            <Box sx={{ width: '100%' }}>
              <Outlet />
            </Box>
          </Flex>
        </Section>
      </Box>
    </>
  );
};
