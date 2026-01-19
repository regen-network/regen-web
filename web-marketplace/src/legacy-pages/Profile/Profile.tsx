import { useMemo, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import {
  DEFAULT_NAME,
  profileVariantMapping,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import {
  getProfileImages,
  getSocialsLinks,
} from 'legacy-pages/Dashboard/Dashboard.utils';
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

import { Link, ReactRouterMuiLink } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useShowCreditClasses } from 'hooks/useShowCreditClasses';

import { useProfileData } from './hooks/useProfileData';
import { ProfileNotFound } from './Profile.NotFound';
import { OrganizationCreatedModal } from './Profile.OrganizationCreatedModal';
import { getDashboardRoute } from './Profile.utils';

export const Profile = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const { wallet } = useWallet();
  const location = useLocation();
  const { _ } = useLingui();
  const showOrgPopup = location.state?.showOrgPopup;
  const [isOrgCreatedModalOpen, setIsOrgCreatedModalOpen] = useState(
    Boolean(showOrgPopup),
  );

  const { address, account, organization, isLoading } = useProfileData();
  const { privActiveAccount } = useAuth();

  const profile = account || organization;

  const { avatarImage, backgroundImage } = useMemo(
    () =>
      getProfileImages({
        profile,
      }),
    [profile],
  );
  const isProfileNotFound = !address && !profile;
  const profileLink = accountAddressOrId
    ? getProfileLink(accountAddressOrId)
    : '';

  const { isIssuer, isLoadingIsIssuer } = useQueryIsIssuer({ address });
  const { showCreditClasses, creditClasses } = useShowCreditClasses({
    activeAddress: address,
    userAddress: wallet?.address,
  });

  const { adminProjects } = useFetchProjectByAdmin({
    organization,
    adminAccountId: account?.id,
    adminAddress: address,
    isLoading,
  });

  const { batchesWithSupply } = useFetchPaginatedBatches({
    address,
    isAddressLoading: isLoading,
    forceAddress: true,
  });
  const hasCreditBatches = batchesWithSupply && batchesWithSupply.length > 0;

  const socialsLinks = useMemo(() => getSocialsLinks({ profile }), [profile]);

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: _(msg`Portfolio`),
        icon: <CreditsIcon fontSize="small" linearGradient />,
        href: `/profiles/${accountAddressOrId}/portfolio`,
        hidden: Boolean(!address),
      },
      {
        label: _(msg`Projects`),
        icon: <ProjectPageIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/projects`,
        hidden: Boolean(
          address && adminProjects.length === 0 && !privActiveAccount?.email,
        ),
      },
      {
        label: _(msg`Members`),
        icon: <ProjectPageIcon linearGradient />,
        href: `/profiles/${accountAddressOrId}/members`,
        hidden: !organization,
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
        hidden: Boolean(!isIssuer || !hasCreditBatches),
      },
    ],
    [
      _,
      accountAddressOrId,
      address,
      adminProjects.length,
      creditClasses.length,
      isIssuer,
      hasCreditBatches,
      privActiveAccount,
      showCreditClasses,
      organization,
    ],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );
  const dashboardRoute = useMemo(
    () => getDashboardRoute(!!organization),
    [organization],
  );
  const manageButtonConfig = [
    {
      label: _(msg`Manage Portfolio`),
      show: location.pathname.includes('/portfolio'),
      link: `${dashboardRoute}/portfolio`,
    },
    {
      label: _(msg`Manage Projects`),
      show: location.pathname.includes('/projects'),
      link: `${dashboardRoute}/projects`,
    },
    {
      label: _(msg`Manage Members`),
      show: location.pathname.includes('/members'),
      link: `${dashboardRoute}/members`,
    },
    {
      label: _(msg`Manage Credit Classes`),
      show: location.pathname.includes('/credit-classes'),
      link: `${dashboardRoute}/credit-classes`,
    },
    {
      label: _(msg`Manage Credit Batches`),
      show: location.pathname.includes('/credit-batches'),
      link: `${dashboardRoute}/credit-batches`,
    },
  ];

  const isOwnProfile = useMemo(
    () =>
      organization
        ? !!organization.daoByDaoAddress?.assignmentsByDaoAddress?.nodes.find(
            assignment =>
              assignment?.accountByAccountId &&
              privActiveAccount?.id &&
              assignment.accountByAccountId.id === privActiveAccount.id,
          )
        : (wallet?.address &&
            address &&
            wallet.address.toLowerCase() === address.toLowerCase()) ||
          (privActiveAccount?.id &&
            account?.id &&
            privActiveAccount.id === account.id),
    [
      organization,
      wallet?.address,
      address,
      privActiveAccount?.id,
      account?.id,
    ],
  );

  const addressDisplay = address ? truncate(address) : '';

  const infos = {
    ...(addressDisplay
      ? {
          addressLink: {
            href: address
              ? getAccountUrl(address, true)
              : `/profiles/${accountAddressOrId}/portfolio`,
            text: addressDisplay,
          },
        }
      : {}),
    description: account?.description?.trimEnd() ?? '',
    socialsLinks,
  };

  const editLink = isOwnProfile
    ? organization
      ? '/dashboard/organization/profile'
      : '/dashboard/profile'
    : '';

  return (
    <WithLoader
      isLoading={isLoading || isLoadingIsIssuer}
      sx={{
        py: 10,
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <>
        <OrganizationCreatedModal
          open={isOrgCreatedModalOpen}
          onClose={() => setIsOrgCreatedModalOpen(false)}
          numberOfMigratedProjects={adminProjects?.length || 0}
        />
        {isProfileNotFound && <ProfileNotFound sx={{ mt: 22.5, mb: 27.25 }} />}
        {!isProfileNotFound && (
          <>
            <ProfileHeader
              name={profile?.name ? profile?.name : _(DEFAULT_NAME)}
              backgroundImage={backgroundImage}
              avatar={avatarImage}
              infos={infos}
              editLink={editLink}
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
              <Section sx={{ root: { pt: { xs: '30px', sm: '60px' } } }}>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
                    <IconTabs
                      aria-label={_(msg`public profile tabs`)}
                      tabs={tabs}
                      activeTab={activeTab}
                      mobileFullWidth
                      linkComponent={ReactRouterMuiLink}
                    />
                    <div className="flex w-full md:w-auto mt-[30px] mb-7.5 md:mt-0 md:mb-0">
                      {manageButtonConfig.map(
                        btn =>
                          btn.show &&
                          isOwnProfile && (
                            <OutlinedButton
                              key={btn.label}
                              variant="contained"
                              color="primary"
                              component={Link}
                              href={btn.link}
                              className="text-[12px] mb-30 md:mb-0 md:text-[14px] py-[6px] px-[20px] md:py-[9px] md:px-[25px] whitespace-nowrap w-full md:w-auto"
                            >
                              <CogIcon className="mr-10" />
                              {btn.label}
                            </OutlinedButton>
                          ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:pt-40 pb-[85px] md:pb-[113px] w-full">
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
