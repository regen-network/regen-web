import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/lib/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import Section from 'web-components/lib/components/section';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { isBridgeEnabled } from 'lib/ledger';
import { getProfileLink } from 'lib/profileLink';
import { useWallet } from 'lib/wallet/wallet';

import {
  getSocialsLinks,
  getUserImages,
} from 'pages/Dashboard/Dashboard.utils';
import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { ProfileNotFound } from './EcocreditsByAccount.NotFound';
import { ecocreditsByAccountStyles } from './EcocreditsByAccount.styles';
import { useProfileData } from './hooks/useProfileData';

export const EcocreditsByAccount = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const { wallet } = useWallet();
  const location = useLocation();

  const { address, account, isLoading } = useProfileData();
  const { avatarImage, backgroundImage } = getUserImages({ account });
  const isProfileNotFound = !address && !account;
  const profileLink = accountAddressOrId
    ? getProfileLink(accountAddressOrId)
    : '';
  const { creditClasses } = useFetchCreditClassesWithOrder({
    admin: address,
    userAddress: wallet?.address,
  });

  const { isIssuer, isProjectAdmin, showCreditClasses } = useProfileItems({
    address,
  });

  const socialsLinks = useMemo(() => getSocialsLinks({ account }), [account]);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: <CreditsIcon fontSize="small" />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
      },
      {
        label: 'Projects',
        icon: <ProjectPageIcon />,
        href: `/profiles/${accountAddressOrId}/projects`,
        hidden: !isProjectAdmin,
      },
      {
        label: 'Credit Classes',
        icon: <CreditClassIcon />,
        href: `/profiles/${accountAddressOrId}/credit-classes`,
        hidden: !showCreditClasses || creditClasses.length === 0,
      },
      {
        label: 'Credit Batches',
        icon: <CreditBatchIcon />,
        href: `/profiles/${accountAddressOrId}/credit-batches`,
        hidden: !isIssuer,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: `/profiles/${accountAddressOrId}/bridge`,
        hidden: !isBridgeEnabled,
      },
    ],
    [
      accountAddressOrId,
      creditClasses.length,
      isIssuer,
      isProjectAdmin,
      showCreditClasses,
    ],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
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
              name={account?.name ? account?.name : DEFAULT_NAME}
              backgroundImage={backgroundImage}
              avatar={avatarImage}
              infos={{
                addressLink: {
                  href: address
                    ? getAccountUrl(accountAddressOrId, true)
                    : `/profiles/${accountAddressOrId}/portfolio`,
                  text: address ? truncate(accountAddressOrId) : '',
                },
                description: account?.description?.trimEnd() ?? '',
                socialsLinks,
              }}
              editLink=""
              profileLink={profileLink}
              variant={
                account?.type
                  ? profileVariantMapping[account.type]
                  : 'individual'
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
