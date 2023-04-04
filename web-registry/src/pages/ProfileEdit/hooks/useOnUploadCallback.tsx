import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { uploadImage } from 'web-components/lib/utils/s3';

import {
  PartyByAddrQuery,
  useUpdatePartyByIdMutation,
} from 'generated/graphql';
import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import {
  PROFILE_AVATAR_FILE_NAME,
  PROFILE_BG_FILE_NAME,
} from 'components/organisms/EditProfileForm/EditProfileForm.constants';

import { PROFILE_S3_PATH, PROFILE_SAVED } from '../ProfileEdit.constants';

type Params = {
  partyByAddr?: PartyByAddrQuery | null;
  updatePartyById: ReturnType<typeof useUpdatePartyByIdMutation>[0];
  refreshProfileData: () => Promise<void>;
};

export const useOnUploadCallback = ({
  updatePartyById,
  refreshProfileData,
  partyByAddr,
}: Params) => {
  const party = partyByAddr?.walletByAddr?.partyByWalletId;
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const onUpload = useCallback(
    async (imageFile: File) => {
      const currentTime = new Date().getTime();
      try {
        const result = await uploadImage(
          imageFile,
          `${PROFILE_S3_PATH}/${party?.id}/${currentTime}`,
          apiUri,
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
      party,
      updatePartyById,
      refreshProfileData,
    ],
  );

  return onUpload;
};
