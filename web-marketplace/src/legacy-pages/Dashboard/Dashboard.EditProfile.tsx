import { useCallback, useMemo, useRef, useState } from 'react';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { profileBannerCardAtom } from 'legacy-pages/Dashboard/Dashboard.store';
import { ERROR_BUTTON_EDIT_ORGANIZATION } from 'legacy-pages/Dashboard/MyEcocredits/MyEcocredits.constants';

import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { deleteImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  SEE_LESS,
  SEE_MORE,
  TX_ERROR_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { apiServerUrl } from 'lib/env';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';

import { Link } from 'components/atoms';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
  PROFILE_S3_PATH,
  PROFILE_SAVED,
} from './Dashboard.constants';
import { useDashboardContext } from './Dashboard.context';
import { useOnUploadCallback } from './hooks/useOnUploadCallback';
import { useUpdateOrganizationProfile } from './hooks/useUpdateOrganizationProfile';

export const EditProfile = () => {
  const { _ } = useLingui();
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { activeAccount } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const reactQueryClient = useQueryClient();
  const [profileBannerCard, setProfileBannerCard] = useAtom(
    profileBannerCardAtom,
  );
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const [error, setError] = useState<string | undefined>();
  const {
    selectedAccountAddress,
    isOrganizationDashboard,
    organizationDaoAddress,
    organizationRbamAddress,
    organizationProfile: organizationProfileFromContext,
  } = useDashboardContext();
  const updateOrganizationProfile = useUpdateOrganizationProfile();
  const organizationProfile = organizationProfileFromContext ?? null;
  const organizationId = organizationProfile?.id;
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
      profileImage: image ? image : DEFAULT_PROFILE_USER_AVATAR,
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
        organizationId ?? '',
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
    organizationId,
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
      setError(undefined); // Clear any previous errors

      try {
        if (isOrgDashboard) {
          if (
            !organizationDaoAddress ||
            !organizationRbamAddress ||
            !organizationId
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
            organizationId: organizationId,
            values: {
              name,
              description,
              profileImage: isDefaultAvatar ? null : profileImage,
              backgroundImage: isDefaultBg ? null : backgroundImage,
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
              ? organizationId ?? ''
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

        // Only show success banner if everything succeeded
        setBannerTextAtom(_(PROFILE_SAVED));

        // Refresh profile data
        if (selectedAccountAddress) {
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountByAddrQueryKey({
              addr: selectedAccountAddress,
            }),
          });
        }
        if (activeAccount) {
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountByIdQueryKey({ id: activeAccount.id }),
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      } finally {
        if (shouldCloseProcessingModal) {
          setProcessingModalAtom(modal => {
            modal.open = false;
          });
        }
      }
    },
    [
      _,
      activeAccount,
      isOrgDashboard,
      organizationDaoAddress,
      organizationId,
      organizationProfile?.bgImage,
      organizationProfile?.description,
      organizationProfile?.image,
      organizationProfile?.twitterLink,
      organizationProfile?.websiteLink,
      organizationRbamAddress,
      setProfileBannerCard,
      setProcessingModalAtom,
      setError,
      setBannerTextAtom,
      selectedAccountAddress,
      reactQueryClient,
      profileBannerCard,
      updateAccountById,
      updateOrganizationProfile,
    ],
  );

  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
    accountId: isOrgDashboard ? organizationId : undefined,
  });

  const handleErrorClose = useCallback(() => {
    setError(undefined);
  }, []);

  if (shouldBlockRender) return null;

  const txHashUrl = getHashUrl('');

  return (
    <>
      <EditProfileForm
        key={editProfileFormKey}
        onSubmit={onSubmit}
        onUpload={onUpload}
        initialValues={initialValues}
        prefillValues={isOrgDashboard ? initialValues : undefined}
        isDirtyRef={isDirtyRef}
      >
        <EditProfileFormActionBar />
      </EditProfileForm>
      <TxErrorModal
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        error={error ?? ''}
        open={!!error}
        onClose={handleErrorClose}
        txHash=""
        txHashUrl={txHashUrl}
        cardTitle=""
        buttonTitle={_(ERROR_BUTTON_EDIT_ORGANIZATION)}
        linkComponent={Link}
        onButtonClick={handleErrorClose}
        title={_(TX_ERROR_MODAL_TITLE)}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
    </>
  );
};
