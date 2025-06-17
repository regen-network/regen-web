import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { profileBannerCardAtom } from 'legacy-pages/Dashboard/Dashboard.store';

import { deleteImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { useOnUploadCallback } from './hooks/useOnUploadCallback';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_TYPE,
  PROFILE_S3_PATH,
  PROFILE_SAVED,
} from './ProfileEdit.constants';
import { getDefaultAvatar } from './ProfileEdit.utils';

export const ProfileEditMain = () => {
  const { _ } = useLingui();
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const reactQueryClient = useQueryClient();
  const navigate = useNavigate();
  const defaultAvatar = getDefaultAvatar(activeAccount);
  const [profileBannerCard, setProfileBannerCard] = useAtom(
    profileBannerCardAtom,
  );
  const fileNamesToDeleteRef = useRef<string[]>([]);

  const initialValues: EditProfileFormSchemaType = useMemo(() => {
    const {
      name,
      description,
      image,
      bgImage,
      type,
      twitterLink,
      websiteLink,
    } = activeAccount ?? {};

    return {
      name: name ? name : _(DEFAULT_NAME),
      description: description?.trimEnd() ?? '',
      profileImage: image ? image : defaultAvatar,
      backgroundImage: bgImage ? bgImage : DEFAULT_PROFILE_BG,
      profileType: type ?? DEFAULT_PROFILE_TYPE,
      twitterLink: twitterLink ?? '',
      websiteLink: websiteLink ?? '',
    };
  }, [_, activeAccount, defaultAvatar]);

  /* callbacks */
  const onSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      const {
        profileType,
        profileImage,
        backgroundImage,
        name,
        description,
        twitterLink,
        websiteLink,
      } = values;
      const isDefaultAvatar = DEFAULT_PROFILE_AVATARS.includes(profileImage);
      const isDefaultBg = DEFAULT_PROFILE_BG === backgroundImage;
      await updateAccountById({
        variables: {
          input: {
            id: activeAccount?.id,
            accountPatch: {
              name,
              description,
              image: isDefaultAvatar ? undefined : profileImage,
              bgImage: isDefaultBg ? undefined : backgroundImage,
              type: profileType,
              twitterLink,
              websiteLink,
            },
          },
        },
      });
      // Delete old avatar and/or bg image
      await Promise.all(
        fileNamesToDeleteRef?.current.map(async fileName => {
          await deleteImage(
            PROFILE_S3_PATH,
            activeAccount?.id ?? '',
            fileName,
            apiServerUrl,
          );
        }),
      );
      fileNamesToDeleteRef.current = [];
      // hide the banner if a user has set name, profile image, background image and one of the external links
      if (
        !profileBannerCard[activeAccount?.id] &&
        name &&
        profileImage &&
        backgroundImage &&
        (twitterLink || websiteLink)
      ) {
        setProfileBannerCard({
          ...profileBannerCard,
          [activeAccount?.id]: true,
        });
      }
    },
    [
      activeAccount?.id,
      profileBannerCard,
      setProfileBannerCard,
      updateAccountById,
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

  const onSuccess = useCallback(() => {
    setBannerTextAtom(_(PROFILE_SAVED));
    refreshProfileData();
    navigate('/dashboard');
  }, [setBannerTextAtom, _, refreshProfileData, navigate]);

  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });

  return (
    <EditProfileForm
      onSubmit={onSubmit}
      onSuccess={onSuccess}
      onUpload={onUpload}
      initialValues={initialValues}
      isDirtyRef={isDirtyRef}
    >
      <EditProfileFormActionBar />
    </EditProfileForm>
  );
};
