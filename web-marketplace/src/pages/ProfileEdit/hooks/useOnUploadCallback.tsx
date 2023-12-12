import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';

import {
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_BG_FILE_NAME,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';

import { PROFILE_S3_PATH, PROFILE_SAVED } from '../ProfileEdit.constants';

type Params = {
  updateAccountById: ReturnType<typeof useUpdateAccountByIdMutation>[0];
  refreshProfileData: () => Promise<void>;
};

export const useOnUploadCallback = ({
  updateAccountById,
  refreshProfileData,
}: Params) => {
  const { activeAccount } = useAuth();
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const onUpload = useCallback(
    async (imageFile: File) => {
      const currentTime = new Date().getTime();
      try {
        const result = await uploadImage(
          imageFile,
          `${PROFILE_S3_PATH}/${activeAccount?.id}/${currentTime}`,
          apiUri,
        );
        if (result.includes(PROFILE_AVATAR_FILE_NAME)) {
          await updateAccountById({
            variables: {
              input: {
                id: activeAccount?.id,
                accountPatch: {
                  image: result,
                },
              },
            },
          });
        }
        if (result.includes(PROFILE_BG_FILE_NAME)) {
          await updateAccountById({
            variables: {
              input: {
                id: activeAccount?.id,
                accountPatch: {
                  bgImage: result,
                },
              },
            },
          });
        }
        setBannerTextAtom(PROFILE_SAVED);
        await refreshProfileData();
        return result;
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        return '';
      }
    },
    [
      setBannerTextAtom,
      setErrorBannerTextAtom,
      activeAccount,
      updateAccountById,
      refreshProfileData,
    ],
  );

  return onUpload;
};
