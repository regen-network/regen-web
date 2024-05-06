import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadImage } from 'web-components/src/utils/s3';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';

import { PROFILE_S3_PATH } from '../ProfileEdit.constants';

export const useOnUploadCallback = () => {
  const { activeAccount } = useAuth();
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
        return result;
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        return '';
      }
    },
    [setErrorBannerTextAtom, activeAccount],
  );

  return onUpload;
};
