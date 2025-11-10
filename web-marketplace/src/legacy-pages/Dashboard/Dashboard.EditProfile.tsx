import { useCallback, useMemo, useRef } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { profileBannerCardAtom } from 'legacy-pages/Dashboard/Dashboard.store';

import { deleteImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { useUpdateOrganizationProfile } from 'hooks/useUpdateOrganizationProfile';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  PROFILE_S3_PATH,
  PROFILE_SAVED,
} from './Dashboard.constants';
import { useDashboardContext } from './Dashboard.context';
import { getDefaultAvatar } from './Dashboard.utils';
import { useOnUploadCallback } from './hooks/useOnUploadCallback';

export const EditProfile = () => {
  const { _ } = useLingui();
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const reactQueryClient = useQueryClient();
  const defaultAvatar = getDefaultAvatar(activeAccount);
  const [profileBannerCard, setProfileBannerCard] = useAtom(
    profileBannerCardAtom,
  );
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const {
    isOrganizationDashboard,
    organizationDaoAddress,
    organizationRbamAddress,
    organizationProfile: organizationProfileFromContext,
  } = useDashboardContext();
  const organizationDao = useDaoOrganization();
  const latestOrganizationProfile = organizationDao?.organizationByDaoAddress;
  const updateOrganizationProfile = useUpdateOrganizationProfile();
  const organizationProfile =
    latestOrganizationProfile ?? organizationProfileFromContext ?? null;
  const organizationIdentifier =
    organizationProfile?.id ?? organizationDaoAddress ?? undefined;
  const hasOrgContext =
    Boolean(organizationDaoAddress) && Boolean(organizationRbamAddress);
  const isOrgDashboard = hasOrgContext && (isOrganizationDashboard ?? true);
  const shouldBlockRender =
    isOrgDashboard && (!hasOrgContext || !organizationProfile);

  const initialValues: EditProfileFormSchemaType = useMemo(() => {
    if (isOrgDashboard) {
      const trimmedOrgName = organizationProfile?.name?.trim();
      const resolvedName = trimmedOrgName || _(DEFAULT_NAME);

      const resolvedDescription =
        organizationProfile?.description?.trimEnd() ?? '';

      const normalizedOrgImage = organizationProfile?.image?.trim();
      const normalizedOrgBackground = organizationProfile?.bgImage?.trim();
      const resolvedProfileImage =
        normalizedOrgImage || DEFAULT_PROFILE_COMPANY_AVATAR;
      const resolvedBackgroundImage =
        normalizedOrgBackground || DEFAULT_PROFILE_BG;

      return {
        name: resolvedName,
        description: resolvedDescription,
        profileImage: resolvedProfileImage,
        backgroundImage: resolvedBackgroundImage,
        twitterLink: organizationProfile?.twitterLink?.trim() ?? '',
        websiteLink: organizationProfile?.websiteLink?.trim() ?? '',
      };
    }

    const { name, description, image, bgImage, twitterLink, websiteLink } =
      activeAccount ?? {};

    return {
      name: name ? name : _(DEFAULT_NAME),
      description: description?.trimEnd() ?? '',
      profileImage: image ? image : defaultAvatar,
      backgroundImage: bgImage ? bgImage : DEFAULT_PROFILE_BG,
      twitterLink: twitterLink ?? '',
      websiteLink: websiteLink ?? '',
    };
  }, [
    _,
    activeAccount,
    defaultAvatar,
    isOrgDashboard,
    organizationProfile?.bgImage,
    organizationProfile?.description,
    organizationProfile?.image,
    organizationProfile?.name,
    organizationProfile?.twitterLink,
    organizationProfile?.websiteLink,
  ]);

  const editProfileFormKey = useMemo(() => {
    if (isOrgDashboard) {
      return [
        'org',
        organizationIdentifier ?? '',
        organizationProfile?.image ?? '',
        organizationProfile?.bgImage ?? '',
      ].join('|');
    }

    return [
      'personal',
      activeAccount?.id ?? '',
      activeAccount?.image ?? '',
      activeAccount?.bgImage ?? '',
    ].join('|');
  }, [
    activeAccount?.bgImage,
    activeAccount?.id,
    activeAccount?.image,
    isOrgDashboard,
    organizationIdentifier,
    organizationProfile?.bgImage,
    organizationProfile?.image,
  ]);

  /* callbacks */
  const onSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      const {
        profileImage,
        backgroundImage,
        name,
        description,
        twitterLink,
        websiteLink,
      } = values;
      const isDefaultAvatar = DEFAULT_PROFILE_AVATARS.includes(profileImage);
      const isDefaultBg = DEFAULT_PROFILE_BG === backgroundImage;

      let shouldCloseProcessingModal = false;

      try {
        if (isOrgDashboard) {
          if (
            !organizationDaoAddress ||
            !organizationRbamAddress ||
            !organizationIdentifier
          ) {
            // eslint-disable-next-line lingui/no-unlocalized-strings
            throw new Error('Organization context not found.');
          }

          setProcessingModalAtom(modal => {
            modal.open = true;
          });
          shouldCloseProcessingModal = true;

          await updateOrganizationProfile({
            daoAddress: organizationDaoAddress,
            rbamAddress: organizationRbamAddress,
            organizationId: organizationIdentifier,
            values: {
              name,
              description,
              profileImage: isDefaultAvatar ? undefined : profileImage,
              backgroundImage: isDefaultBg ? undefined : backgroundImage,
              twitterLink,
              websiteLink,
            },
            currentValues: {
              description: organizationProfile?.description ?? '',
              profileImage: organizationProfile?.image ?? null,
              backgroundImage: organizationProfile?.bgImage ?? null,
              websiteLink: organizationProfile?.websiteLink ?? null,
              twitterLink: organizationProfile?.twitterLink ?? null,
            },
          });
        } else {
          await updateAccountById({
            variables: {
              input: {
                id: activeAccount?.id,
                accountPatch: {
                  name,
                  description,
                  image: isDefaultAvatar ? undefined : profileImage,
                  bgImage: isDefaultBg ? undefined : backgroundImage,
                  twitterLink,
                  websiteLink,
                },
              },
            },
          });

          // hide the banner if a user has set name, profile image, background image and one of the external links
          if (
            !profileBannerCard[activeAccount?.id] &&
            name &&
            profileImage &&
            backgroundImage &&
            (twitterLink || websiteLink)
          ) {
            const targetId = activeAccount?.id ?? '';
            setProfileBannerCard(prev => ({
              ...prev,
              [targetId]: true,
            }));
          }
        }

        // Delete old avatar and/or bg image
        await Promise.all(
          fileNamesToDeleteRef?.current.map(async fileName => {
            const targetId = isOrgDashboard
              ? organizationIdentifier ?? ''
              : activeAccount?.id ?? '';
            await deleteImage(
              PROFILE_S3_PATH,
              targetId,
              fileName,
              apiServerUrl,
            );
          }),
        );
        fileNamesToDeleteRef.current = [];
      } finally {
        if (shouldCloseProcessingModal) {
          setProcessingModalAtom(modal => {
            modal.open = false;
          });
        }
      }
    },
    [
      activeAccount?.id,
      isOrgDashboard,
      organizationDaoAddress,
      organizationIdentifier,
      organizationProfile?.bgImage,
      organizationProfile?.description,
      organizationProfile?.image,
      organizationProfile?.twitterLink,
      organizationProfile?.websiteLink,
      organizationRbamAddress,
      setProfileBannerCard,
      setProcessingModalAtom,
      profileBannerCard,
      updateAccountById,
      updateOrganizationProfile,
    ],
  );

  const refreshProfileData = useCallback(async () => {
    if (wallet?.address) {
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
      });
    }
    if (activeAccount) {
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountByIdQueryKey({ id: activeAccount.id }),
      });
    }
  }, [activeAccount, reactQueryClient, wallet?.address]);

  const refreshOrganizationData = useCallback(
    async (daoAddr?: string) => {
      if (!daoAddr) return;
      await Promise.all([
        reactQueryClient.invalidateQueries({
          queryKey: ['dao-config', daoAddr],
        }),
        reactQueryClient.invalidateQueries({
          queryKey: ['organization-profile', daoAddr],
        }),
      ]);
    },
    [reactQueryClient],
  );

  const onSuccess = useCallback(() => {
    setBannerTextAtom(_(PROFILE_SAVED));
    void refreshProfileData();
    if (isOrgDashboard) {
      void refreshOrganizationData(organizationDaoAddress);
    }
  }, [
    setBannerTextAtom,
    _,
    refreshProfileData,
    isOrgDashboard,
    refreshOrganizationData,
    organizationDaoAddress,
  ]);
  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });

  if (shouldBlockRender) return null;

  return (
    <EditProfileForm
      key={editProfileFormKey}
      onSubmit={onSubmit}
      onSuccess={onSuccess}
      onUpload={onUpload}
      initialValues={initialValues}
      prefillValues={isOrgDashboard ? initialValues : undefined}
      isDirtyRef={isDirtyRef}
    >
      <EditProfileFormActionBar />
    </EditProfileForm>
  );
};
