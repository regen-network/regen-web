import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import {
  getSocialsLinks,
  getUserImages,
} from 'legacy-pages/Dashboard/Dashboard.utils';
import { useProfileItems } from 'legacy-pages/Dashboard/hooks/useProfileItems';
import { useFetchProjectByAdmin } from 'legacy-pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';

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

import { useAuth } from 'lib/auth/auth';
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

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { useProfileData } from './hooks/useProfileData';
import { ProfileNotFound } from './Profile.NotFound';

export const Profile = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const { wallet } = useWallet();
  const location = useLocation();
  const { _ } = useLingui();

  const { address, account, isLoading } = useProfileData();
  const { privActiveAccount } = useAuth();
  const { avatarImage, backgroundImage } = getUserImages({ account });
  const isProfileNotFound = !address && !account;
  const profileLink = accountAddressOrId
    ? getProfileLink(accountAddressOrId)
    : '';
  const { creditClasses } = useFetchCreditClassesWithOrder({
    admin: address,
    userAddress: wallet?.address,
  });

  const { isIssuer, showCreditClasses } = useProfileItems({
    address,
    accountId: account?.id,
  });

  const { adminProjects } = useFetchProjectByAdmin({
    adminAccountId: account?.id,
    adminAddress: address,
  });

  const socialsLinks = useMemo(() => getSocialsLinks({ account }), [account]);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: _(msg`Portfolio`),
        icon: <CreditsIcon fontSize="small" linearGradient />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
        hidden: Boolean(
          !address || (!!account?.hideEcocredits && !!account?.hideRetirements),
        ),
      },
      {
        label: _(msg`Projects`),
        icon: <ProjectPageIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/projects`,
        hidden: Boolean(
          (adminProjects.length === 0 && !privActiveAccount?.email) ||
            (address && adminProjects.length === 0),
        ),
      },
      {
        label: _(msg`Credit Classes`),
        icon: <CreditClassIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/credit-classes`,
        hidden: Boolean(!showCreditClasses || creditClasses.length === 0),
      },
      {
        label: _(msg`Credit Batches`),
        icon: <CreditBatchIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/credit-batches`,
        hidden: Boolean(!isIssuer),
      },
    ],
    [
      _,
      account?.hideEcocredits,
      account?.hideRetirements,
      accountAddressOrId,
      address,
      adminProjects.length,
      creditClasses.length,
      isIssuer,
      privActiveAccount,
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
      show: location.pathname.includes('/portfolio'),
      link: '/dashboard/portfolio',
    },
    {
      label: _(msg`Manage Projects`),
      show: location.pathname.includes('/projects'),
      link: '/dashboard/projects',
    },
    {
      label: _(msg`Manage Credit Classes`),
      show: location.pathname.includes('/credit-classes'),
      link: '/dashboard/credit-classes',
    },
    {
      label: _(msg`Manage Credit Batches`),
      show: location.pathname.includes('/credit-batches'),
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
                (wallet?.address &&
                  address &&
                  wallet.address.toLowerCase() === address.toLowerCase()) ||
                (privActiveAccount?.email &&
                  account?.id &&
                  privActiveAccount.id === account.id)
                  ? '/dashboard/profile'
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
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
                    <IconTabs
                      aria-label={_(msg`public profile tabs`)}
                      tabs={tabs}
                      linkComponent={Link}
                      activeTab={activeTab}
                      mobileFullWidth
                    />
                    <div className="flex w-full md:w-auto mt-[30px] mb-7.5 md:mt-0 md:mb-0">
                      {manageButtonConfig.map(
                        btn =>
                          btn.show &&
                          ((wallet?.address &&
                            address &&
                            wallet.address.toLowerCase() ===
                              address.toLowerCase()) ||
                            (privActiveAccount?.email &&
                              account?.id &&
                              privActiveAccount.id === account.id)) && (
                            <OutlinedButton
                              key={btn.label}
                              variant="contained"
                              color="primary"
                              component={Link}
                              href={btn.link}
                              className="text-[12px] md:text-[14px] py-[6px] px-[20px] md:py-[9px] md:px-[25px] whitespace-nowrap w-full md:w-auto"
                            >
                              <CogIcon className="mr-10" />
                              {btn.label}
                            </OutlinedButton>
                          ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-[30px] md:pt-[40px] pb-[85px] md:pb-[113px] w-full">
                  <Outlet />
                </div>
              </Section>
            </Box>
          </>
        )}
      </>
    </WithLoader>
  );
};
