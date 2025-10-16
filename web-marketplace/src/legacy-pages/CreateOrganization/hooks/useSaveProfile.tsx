import { useCallback, useRef } from 'react';

import { deleteImage } from 'web-components/src/utils/s3';

import { PersonalProfileSchemaType } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.schema';
import {
  DEFAULT_PROFILE_AVATARS,
  PROFILE_S3_PATH,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import {
  AccountsOrderBy,
  useUpdateAccountByIdMutation,
} from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useOnUploadCallback } from 'legacy-pages/Dashboard/hooks/useOnUploadCallback';
import { useQueryClient } from '@tanstack/react-query';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';

export const useSaveProfile = (daoAccountsOrderBy: AccountsOrderBy) => {
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const { activeAccountId } = useAuth();
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const reactQueryClient = useQueryClient();

  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });

  const saveProfile = useCallback(
    async (data: PersonalProfileSchemaType) => {
      const { avatar, name, description, title } = data;
      const isDefaultAvatar =
        avatar && DEFAULT_PROFILE_AVATARS.includes(avatar);
      await updateAccountById({
        variables: {
          input: {
            id: activeAccountId,
            accountPatch: {
              name,
              description,
              image: isDefaultAvatar ? undefined : avatar,
              title,
            },
          },
        },
      });
      // Delete old avatar
      await Promise.all(
        fileNamesToDeleteRef?.current.map(async fileName => {
          await deleteImage(
            PROFILE_S3_PATH,
            activeAccountId ?? '',
            fileName,
            apiServerUrl,
          );
        }),
      );
      fileNamesToDeleteRef.current = [];

      await reactQueryClient.invalidateQueries({
        queryKey: getAccountByIdQueryKey({
          id: activeAccountId,
          daoAccountsOrderBy,
        }),
      });
    },
    [activeAccountId, updateAccountById, daoAccountsOrderBy],
  );

  return { saveProfile, onUpload };
};
