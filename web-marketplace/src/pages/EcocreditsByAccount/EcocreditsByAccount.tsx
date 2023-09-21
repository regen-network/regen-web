import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';

import {
  getSocialsLinks,
  getUserImages,
} from 'pages/Dashboard/Dashboard.utils';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

import { ProfileNotFound } from './EcocreditsByAccount.NotFound';
import { ecocreditsByAccountStyles } from './EcocreditsByAccount.styles';
import { useProfileData } from './hooks/useProfileData';

export const EcocreditsByAccount = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const location = useLocation();

  const { address, party, isLoading } = useProfileData();
  const { avatarImage, backgroundImage } = getUserImages({ party });
  const isProfileNotFound = !address && !party;

  const socialsLinks = useMemo(() => getSocialsLinks({ party }), [party]);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: <CreditsIcon fontSize="small" />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
        hidden: !party,
      },
      {
        label: 'Projects',
        icon: <ProjectPageIcon />,
        href: `/profiles/${accountAddressOrId}/projects`,
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
    <WithLoader
      isLoading={isLoading}
      sx={{
        py: 10,
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <>
        {isProfileNotFound && <ProfileNotFound sx={{ mt: 22.5, mb: 27.25 }} />}
        {!isProfileNotFound && (
          <>
            <ProfileHeader
              name={party?.name ? party?.name : DEFAULT_NAME}
              backgroundImage={backgroundImage}
              avatar={avatarImage}
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
              variant={
                party?.type ? profileVariantMapping[party.type] : 'individual'
              }
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
        )}
      </>
    </WithLoader>
  );
};
