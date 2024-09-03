import { MutableRefObject, useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadFile } from 'web-components/src/utils/s3';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';

import { PROFILE_S3_PATH } from '../ProfileEdit.constants';

type Params = {
  fileNamesToDeleteRef: MutableRefObject<string[]>;
};

export const useOnUploadCallback = ({ fileNamesToDeleteRef }: Params) => {
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const onUpload = useCallback(
    async (imageFile: File, value?: string) => {
      const currentTime = new Date().getTime();
      try {
        const result = await uploadFile(
          imageFile,
          `${PROFILE_S3_PATH}/${activeAccount?.id}/${currentTime}`,
          apiUri,
        );
        if (value) fileNamesToDeleteRef.current.push(value);
        return result;
      } catch (e) {
        setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        return '';
      }
    },
    [_, activeAccount?.id, fileNamesToDeleteRef, setErrorBannerTextAtom],
  );

  return onUpload;
};
