import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { useUpdatePartyByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { isProfileEditDirtyRef } from 'lib/atoms/ref.atoms';
import { getPartiesByAccountIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getPartiesByAccountIdById/getPartiesByAccountIdQuery.utils';
import { getPartyByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { useOnUploadCallback } from './hooks/useOnUploadCallback';
import { usePartyInfos } from './hooks/usePartyInfos';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_TYPE,
  PROFILE_SAVED,
} from './ProfileEdit.constants';

export const ProfileEditMain = () => {
  const [isDirtyRef] = useAtom(isProfileEditDirtyRef);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet, accountId, partyByAddr } = useWallet();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const reactQueryClient = useQueryClient();
  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const initialValues: EditProfileFormSchemaType = useMemo(
    () => ({
      name: String(party?.name ? party?.name : DEFAULT_NAME),
      description: String(party?.description?.trimEnd() ?? ''),
      profileImage: String(party?.image ? party?.image : defaultAvatar),
      backgroundImage: String(
        party?.bgImage ? party?.bgImage : DEFAULT_PROFILE_BG,
      ),
      profileType: party?.type ?? DEFAULT_PROFILE_TYPE,
      twitterLink: String(party?.twitterLink ?? ''),
      websiteLink: String(party?.websiteLink ?? ''),
    }),
    [party, defaultAvatar],
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
      await updatePartyById({
        variables: {
          input: {
            id: party?.id,
            partyPatch: {
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
    [party, updatePartyById],
  );

  const refreshProfileData = useCallback(async () => {
    if (wallet?.address) {
      await reactQueryClient.invalidateQueries({
        queryKey: getPartyByAddrQueryKey({ addr: wallet?.address }),
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getPartiesByAccountIdQueryKey({ id: accountId }),
      });
    }
  }, [accountId, reactQueryClient, wallet?.address]);

  const onSuccess = useCallback(() => {
    setBannerTextAtom(PROFILE_SAVED);
    refreshProfileData();
  }, [setBannerTextAtom, refreshProfileData]);

  const onUpload = useOnUploadCallback({
    partyByAddr,
    updatePartyById,
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
