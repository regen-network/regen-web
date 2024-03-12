import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { useAuth } from 'lib/auth/auth';
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
  PROFILE_SAVED,
} from './ProfileEdit.constants';
import { getDefaultAvatar } from './ProfileEdit.utils';
import { useNavigate } from 'react-router-dom';

export const ProfileEditMain = () => {
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const reactQueryClient = useQueryClient();
  const navigate = useNavigate();
  const defaultAvatar = getDefaultAvatar(activeAccount);

  const initialValues: EditProfileFormSchemaType = useMemo(
    () => ({
      name: String(activeAccount?.name ? activeAccount?.name : DEFAULT_NAME),
      description: String(activeAccount?.description?.trimEnd() ?? ''),
      profileImage: String(
        activeAccount?.image ? activeAccount?.image : defaultAvatar,
      ),
      backgroundImage: String(
        activeAccount?.bgImage ? activeAccount?.bgImage : DEFAULT_PROFILE_BG,
      ),
      profileType: activeAccount?.type ?? DEFAULT_PROFILE_TYPE,
      twitterLink: String(activeAccount?.twitterLink ?? ''),
      websiteLink: String(activeAccount?.websiteLink ?? ''),
    }),
    [activeAccount, defaultAvatar],
  );

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
    },
    [activeAccount, updateAccountById],
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

  const onSuccess = useCallback(async () => {
    setBannerTextAtom(PROFILE_SAVED);
    refreshProfileData();
    navigate('/profile');
  }, [setBannerTextAtom, refreshProfileData]);

  const onUpload = useOnUploadCallback({
    updateAccountById,
    refreshProfileData,
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
