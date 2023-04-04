import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/lib/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import TwitterIcon2 from 'web-components/lib/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'web-components/lib/components/icons/social/WebsiteLinkIcon';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { containerStyles } from 'web-components/lib/styles/container';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { isBridgeEnabled } from 'lib/ledger';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';
import { useQueryIfCreditClassAdmin } from 'hooks/useQueryIfCreditClassAdmin';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIfIssuer } from 'hooks/useQueryIfIssuer';
import { useQueryIfProjectAdmin } from 'hooks/useQueryIfProjectAdmin';

import { dashBoardStyles } from './Dashboard.styles';

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const isIssuer = useQueryIfIssuer();
  const isCreditClassCreator = useQueryIfCreditClassCreator();
  const isCreditClassAdmin = useQueryIfCreditClassAdmin();
  const isProjectAdmin = useQueryIfProjectAdmin();
  const showProjectTab = isIssuer || isProjectAdmin;
  const showCreditClassTab = isCreditClassCreator || isCreditClassAdmin;
  const { wallet, accountId } = useWallet();
  const location = useLocation();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: wallet?.address ?? '',
      enabled: !!wallet?.address && !!graphqlClient,
    }),
  );
  const { party, defaultAvatar } = usePartyInfos({ accountId, partyByAddr });

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: (
          <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
        ),
        href: '/ecocredits/portfolio',
      },
      {
        label: 'Projects',
        icon: <ProjectPageIcon />,
        href: '/ecocredits/projects',
        hidden: !showProjectTab,
      },
      {
        label: 'Credit Classes',
        icon: <CreditClassIcon sx={{ opacity: '70%' }} />,
        href: '/ecocredits/credit-classes',
        hidden: !showCreditClassTab,
      },
      {
        label: 'Credit Batches',
        icon: (
          <CreditBatchIcon sx={{ color: 'secondary.dark', opacity: '70%' }} />
        ),
        href: '/ecocredits/credit-batches',
        hidden: !isIssuer,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: '/ecocredits/bridge',
        hidden: !isBridgeEnabled,
      },
    ],
    [
      isIssuer,
      showCreditClassTab,
      showProjectTab,
      theme.palette.secondary.main,
    ],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  const socialsLinks: SocialLink[] = useMemo(
    () =>
      [
        {
          href: party?.twitterLink,
          icon: <TwitterIcon2 />,
        },
        {
          href: party?.websiteLink,
          icon: <WebsiteLinkIcon />,
        },
      ].filter((link): link is SocialLink => {
        return !!link.href;
      }),
    [party?.twitterLink, party?.websiteLink],
  );

  return (
    <>
      <ProfileHeader
        name={party?.name ? party?.name : DEFAULT_NAME}
        backgroundImage={party?.bgImage ? party?.bgImage : DEFAULT_PROFILE_BG}
        avatar={party?.image ? party?.image : defaultAvatar}
        infos={{
          addressLink: {
            href: getAccountUrl(wallet?.address, true),
            text: truncate(wallet?.address),
          },
          description: party?.description?.trimEnd() ?? '',
          socialsLinks,
        }}
        editLink={accountId ? '/profile/edit' : ''}
        variant={party?.type ? profileVariantMapping[party.type] : 'individual'}
        LinkComponent={Link}
      />
      <Box sx={{ bgcolor: 'grey.50' }}>
        <Box sx={{ pt: 15, ...containerStyles, px: { xs: 5, sm: 10 } }}>
          <IconTabs
            aria-label="dashboard tabs"
            tabs={tabs}
            activeTab={activeTab}
            linkComponent={Link}
            mobileFullWidth
          />
          <Flex sx={{ ...dashBoardStyles.padTop }}>
            <Box sx={{ width: '100%' }}>
              <Outlet
                context={{
                  isCreditClassCreator,
                  isCreditClassAdmin,
                  isProjectAdmin,
                  isIssuer,
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
