import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadImage } from 'web-components/lib/utils/s3';

import {
  PartyByAddrQuery,
  useUpdatePartyByIdMutation,
} from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { apiServerUrl } from 'lib/env';

import {
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_BG_FILE_NAME,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';

import { PROFILE_S3_PATH, PROFILE_SAVED } from '../ProfileEdit.constants';

type Params = {
  partyByAddr?: PartyByAddrQuery;
  updatePartyById: ReturnType<typeof useUpdatePartyByIdMutation>[0];
};

export const useOnUploadCallback = ({
  updatePartyById,
  partyByAddr,
}: Params) => {
  const party = partyByAddr?.walletByAddr?.partyByWalletId;
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const onUpload = useCallback(
    async (imageFile: File) => {
      try {
        const result = await uploadImage(
          imageFile,
          `${PROFILE_S3_PATH}/${party?.id}`,
          apiServerUrl,
        );
        if (result.includes(PROFILE_AVATAR_FILE_NAME)) {
          await updatePartyById({
            variables: {
              input: {
                id: party?.id,
                partyPatch: {
                  image: result,
                },
              },
            },
          });
        }
        if (result.includes(PROFILE_BG_FILE_NAME)) {
          await updatePartyById({
            variables: {
              input: {
                id: party?.id,
                partyPatch: {
                  bgImage: result,
                },
              },
            },
          });
        }
        setBannerTextAtom(PROFILE_SAVED);
        return result;
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        return '';
      }
    },
    [setBannerTextAtom, setErrorBannerTextAtom, party, updatePartyById],
  );

  return onUpload;
};
