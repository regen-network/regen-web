import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';

import { Flex } from 'web-components/src/components/box';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import { CreditBatchIcon } from 'web-components/src/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/src/components/icons/ProjectPageIcon';
import { ProfileHeader } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader';
import Section from 'web-components/src/components/section';
import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';
import { truncate } from 'web-components/src/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import {
  ALT_PROFILE_AVATAR,
  ALT_PROFILE_BACKGROUND_IMAGE,
  COPY_PROFILE_TEXT,
  COPY_SUCCESS,
  EDIT_PROFILE_TEXT,
} from 'lib/constants/shared.constants';
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
  const { _ } = useLingui();

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
    accountId: account?.id,
  });

  const socialsLinks = useMemo(() => getSocialsLinks({ account }), [account]);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: _(msg`Portfolio`),
        icon: <CreditsIcon fontSize="small" linearGradient />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
        hidden:
          !address || (!!account?.hideEcocredits && !!account?.hideRetirements),
      },
      {
        label: _(msg`Projects`),
        icon: <ProjectPageIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/projects`,
        hidden: !isProjectAdmin,
      },
      {
        label: _(msg`Credit Classes`),
        icon: <CreditClassIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/credit-classes`,
        hidden: !showCreditClasses || creditClasses.length === 0,
      },
      {
        label: _(msg`Credit Batches`),
        icon: <CreditBatchIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/credit-batches`,
        hidden: !isIssuer,
      },
    ],
    [
      _,
      account?.hideEcocredits,
      account?.hideRetirements,
      accountAddressOrId,
      address,
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

  const manageButtonConfig = [
    {
      label: _(msg`Manage Portfolio`),
      show: activeTab === 0,
      link: '/dashboard/portfolio',
    },
    {
      label: _(msg`Manage Projects`),
      show: activeTab === 1,
      link: '/dashboard/projects',
    },
    {
      label: _(msg`Manage Credit Classes`),
      show: activeTab === 2,
      link: '/dashboard/credit-classes',
    },
    {
      label: _(msg`Manage Credit Batches`),
      show: activeTab === 3,
      link: '/dashboard/credit-batches',
    },
  ];

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
              name={account?.name ? account?.name : _(DEFAULT_NAME)}
              backgroundImage={backgroundImage}
              avatar={avatarImage}
              infos={{
                addressLink: {
                  href: address
                    ? getAccountUrl(address, true)
                    : `/profiles/${accountAddressOrId}/portfolio`,
                  text: address ? truncate(address) : '',
                },
                description: account?.description?.trimEnd() ?? '',
                socialsLinks,
              }}
              editLink={
                wallet?.address &&
                address &&
                wallet.address.toLowerCase() === address.toLowerCase()
                  ? '/dashboard/admin/profile'
                  : ''
              }
              profileLink={profileLink}
              variant={
                account?.type
                  ? profileVariantMapping[account.type]
                  : 'individual'
              }
              LinkComponent={Link as LinkComponentType}
              copyProfileText={_(COPY_PROFILE_TEXT)}
              editProfileText={_(EDIT_PROFILE_TEXT)}
              copySuccessText={_(COPY_SUCCESS)}
              altBackgroundImage={_(ALT_PROFILE_BACKGROUND_IMAGE)}
              altAvatar={_(ALT_PROFILE_AVATAR)}
            />
            <Box sx={{ backgroundColor: 'grey.50' }}>
              <Section sx={{ root: { pt: { xs: 15 } } }}>
                <Box>
                  {' '}
                  {/* Reduced mobile padding */}
                  <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
                    <IconTabs
                      aria-label={_(msg`public profile tabs`)}
                      tabs={tabs}
                      linkComponent={Link}
                      activeTab={activeTab}
                      mobileFullWidth
                    />
                    <div className="justify-center flex">
                      {manageButtonConfig.map(
                        btn =>
                          btn.show &&
                          wallet?.address &&
                          address &&
                          wallet.address.toLowerCase() ===
                            address.toLowerCase() && (
                            <OutlinedButton
                              key={btn.label}
                              variant="contained"
                              color="primary"
                              component={Link}
                              href={btn.link}
                              className="text-[14px] py-[9px] px-[25px]"
                            >
                              <CogIcon className="mr-10" />
                              {btn.label}
                            </OutlinedButton>
                          ),
                      )}
                    </div>
                  </div>
                </Box>
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
