import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import { Title } from 'web-components/lib/components/typography';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { WarningModal } from 'pages/ProjectEdit/ProjectEdit.WarningModal';
import WithLoader from 'components/atoms/WithLoader';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormActionBar } from 'components/organisms/EditProfileForm/EditProfileForm.ActionBar';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { useOnUploadCallback } from './hooks/useOnUploadCallback';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_AVATARS,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_TYPE,
  PROFILE,
  PROFILE_SAVED,
  VIEW_PROFILE,
} from './ProfileEdit.constants';
import { getDefaultAvatar } from './ProfileEdit.utils';

export const ProfileEdit = () => {
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet, loaded, accountChanging } = useWallet();
  const { activeAccount, loading } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const reactQueryClient = useQueryClient();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<
    string | undefined
  >(undefined);
  const isDirtyRef = useRef<boolean>(false);
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

  const onSuccess = useCallback(() => {
    setBannerTextAtom(PROFILE_SAVED);
    refreshProfileData();
  }, [setBannerTextAtom, refreshProfileData]);

  const onUpload = useOnUploadCallback({
    updateAccountById,
    refreshProfileData,
  });

  return (
    <>
      <Flex justifyContent="center" sx={{ width: '100%' }}>
        <Flex
          flexDirection="column"
          sx={{
            width: '100%',
            maxWidth: 560,
            mt: { xs: 6, sm: 12.5 },
            mb: { xs: 25, sm: 12.5 },
            mx: { xs: 2.5, sm: 0 },
          }}
        >
          <Flex justifyContent="space-between" sx={{ mb: 12.5 }}>
            <Title variant="h3">{PROFILE}</Title>
            <OutlinedButton
              onClick={() => {
                if (isDirtyRef.current) {
                  setIsWarningModalOpen('/profile/portfolio');
                } else {
                  navigate('/profile/portfolio');
                }
              }}
              startIcon={<EyeIcon />}
            >
              {VIEW_PROFILE}
            </OutlinedButton>
          </Flex>
          <WithLoader
            isLoading={!loaded || accountChanging || loading}
            sx={{ mx: 'auto' }}
          >
            <EditProfileForm
              onSubmit={onSubmit}
              onSuccess={onSuccess}
              onUpload={onUpload}
              initialValues={initialValues}
              isDirtyRef={isDirtyRef}
            >
              <EditProfileFormActionBar />
            </EditProfileForm>
          </WithLoader>
        </Flex>
      </Flex>
      <WarningModal
        open={!!isWarningModalOpen}
        navigate={() => {
          if (isWarningModalOpen) navigate(isWarningModalOpen);
          isDirtyRef.current = false;
        }}
        onClose={() => {
          setIsWarningModalOpen(undefined);
        }}
      />
    </>
  );
};
