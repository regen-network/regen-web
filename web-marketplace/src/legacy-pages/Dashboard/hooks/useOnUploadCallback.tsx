import { MutableRefObject, useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadFile } from 'web-components/src/utils/s3';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';

import { PROFILE_S3_PATH } from '../Dashboard.constants';

type Params = {
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  accountId?: string;
};

export const useOnUploadCallback = ({
  fileNamesToDeleteRef,
  accountId,
}: Params) => {
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const targetAccountId = accountId ?? activeAccount?.id;

  const onUpload = useCallback(
    async (imageFile: File, value?: string) => {
      const currentTime = new Date().getTime();
      if (!targetAccountId) {
        setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        return '';
      }

      try {
        const result = await uploadFile(
          imageFile,
          `${PROFILE_S3_PATH}/${targetAccountId}/${currentTime}`,
          apiUri,
        );
        if (value) fileNamesToDeleteRef.current.push(value);
        return result;
      } catch (e) {
        setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        return '';
      }
    },
    [_, targetAccountId, fileNamesToDeleteRef, setErrorBannerTextAtom],
  );

  return onUpload;
};
