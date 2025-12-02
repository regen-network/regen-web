import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  DEFAULT_PROFILE_AVATARS,
  PROFILE_S3_PATH,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import { useOnUploadCallback } from 'legacy-pages/Dashboard/hooks/useOnUploadCallback';

import { deleteImage } from 'web-components/src/utils/s3';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getDaoByAddressWithAssignmentsQueryKey } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery.utils';

import { PersonalProfileSchemaType } from 'components/organisms/BaseMembersTable/modals/modals.schema';

export const useSaveProfile = () => {
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const { activeAccountId, activeAccount } = useAuth();
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
        }),
      });

      await Promise.all(
        activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.map(
          async dao => {
            if (dao)
              await reactQueryClient.invalidateQueries({
                queryKey: getDaoByAddressWithAssignmentsQueryKey({
                  address: dao.address,
                }),
                refetchType: 'all',
              });
          },
        ) || [],
      );
    },
    [
      activeAccountId,
      updateAccountById,
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes,
      reactQueryClient,
    ],
  );

  return { saveProfile, onUpload };
};
