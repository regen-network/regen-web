import { useCallback } from 'react';
import { useSetAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import { Title } from 'web-components/lib/components/typography';
import { uploadImage } from 'web-components/lib/utils/s3';

import { useUpdatePartyByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { apiServerUrl } from 'lib/env';

import { Link } from 'components/atoms';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { PROFILE, PROFILE_SAVED, VIEW_PROFILE } from './ProfileEdit.constants';

export const ProfileEdit = () => {
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const userId = '6f3bdda8-c70e-11ed-ac59-0242ac120002';
  const [updatePartyById] = useUpdatePartyByIdMutation();

  /* callbacks */
  const onSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      const { profileType, profileImage, backgroundImage, name, description } =
        values;
      await updatePartyById({
        variables: {
          input: {
            id: userId,
            partyPatch: {
              name,
              description,
              image: profileImage,
              type: profileType,
              bgImage: backgroundImage,
            },
          },
        },
      });
    },
    [userId, updatePartyById],
  );

  const onSuccess = useCallback(
    () => setBannerTextAtom(PROFILE_SAVED),
    [setBannerTextAtom],
  );

  const onUpload = useCallback(
    async (imageFile: File) => {
      const result = await uploadImage(
        imageFile,
        `profile/${userId}`,
        apiServerUrl,
      );
      setBannerTextAtom(PROFILE_SAVED);
      return result;
    },
    [setBannerTextAtom],
  );

  return (
    <Flex justifyContent="center" sx={{ width: '100%' }}>
      <Flex
        flexDirection="column"
        sx={{ width: '100%', maxWidth: 560, my: 12.5 }}
      >
        <Flex justifyContent="space-between" sx={{ mb: 12.5 }}>
          <Title variant="h3">{PROFILE}</Title>
          <OutlinedButton
            LinkComponent={Link}
            href="/ecocredits/portfolio"
            startIcon={<EyeIcon />}
          >
            {VIEW_PROFILE}
          </OutlinedButton>
        </Flex>
        <EditProfileForm
          onSubmit={onSubmit}
          onSuccess={onSuccess}
          onUpload={onUpload}
        >
          <EditProfileFormActionBar />
        </EditProfileForm>
      </Flex>
    </Flex>
  );
};
