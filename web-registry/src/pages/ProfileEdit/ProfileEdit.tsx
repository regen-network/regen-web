import { useCallback, useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import { Title } from 'web-components/lib/components/typography';

import { useUpdatePartyByIdMutation } from 'generated/graphql';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
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
  PROFILE,
  PROFILE_SAVED,
  VIEW_PROFILE,
} from './ProfileEdit.constants';

export const ProfileEdit = () => {
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const { wallet, accountId } = useWallet();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const reactQueryClient = useQueryClient();

  const partyByAddrQuery = useMemo(
    () =>
      getPartyByAddrQuery({
        client: graphqlClient,
        addr: wallet?.address ?? '',
        enabled: !!wallet?.address && !!graphqlClient,
      }),
    [graphqlClient, wallet?.address],
  );
  const { data: partyByAddr, isFetching } = useQuery(partyByAddrQuery);
  const { party, defaultAvatar } = usePartyInfos({ accountId, partyByAddr });

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

  const refreshProfileData = useCallback(
    () =>
      reactQueryClient.invalidateQueries({
        queryKey: partyByAddrQuery.queryKey,
      }),
    [partyByAddrQuery, reactQueryClient],
  );

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
            LinkComponent={Link}
            href="/ecocredits/portfolio"
            startIcon={<EyeIcon />}
          >
            {VIEW_PROFILE}
          </OutlinedButton>
        </Flex>
        <WithLoader isLoading={isFetching} sx={{ mx: 'auto' }}>
          <EditProfileForm
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            onUpload={onUpload}
            initialValues={initialValues}
          >
            <EditProfileFormActionBar />
          </EditProfileForm>
        </WithLoader>
      </Flex>
    </Flex>
  );
};
