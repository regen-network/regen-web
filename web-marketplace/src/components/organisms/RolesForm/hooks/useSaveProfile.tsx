import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import {
  useCreateAccountMutation,
  useUpdateAccountByIdMutation,
} from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';

import { ProfileModalSchemaType } from '../components/ProfileModal/ProfileModal.schema';

export const useSaveProfile = () => {
  const { _ } = useLingui();
  const [createAccount] = useCreateAccountMutation();
  const [updateAccount] = useUpdateAccountByIdMutation();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { activeAccountId } = useAuth();

  const saveProfile = useCallback(
    async (
      profile: ProfileModalSchemaType,
    ): Promise<{ id: string; creatorId: string } | undefined> => {
      const edit =
        !!profile.creatorId &&
        profile.creatorId === activeAccountId &&
        !!profile.id;
      try {
        const account = {
          type: profile.profileType,
          name: profile.name,
          description: profile.description,
          image: profile.profileImage,
          addr: profile.address,
          creatorId: activeAccountId,
        };
        if (edit) {
          await updateAccount({
            variables: {
              input: {
                id: profile.id,
                accountPatch: account,
              },
            },
          });
          return { id: profile.id ?? '', creatorId: activeAccountId };
        } else {
          const accountRes = await createAccount({
            variables: {
              input: {
                account,
              },
            },
          });
          return {
            id: accountRes.data?.createAccount?.account?.id,
            creatorId: activeAccountId ?? '',
          };
        }
      } catch (e) {
        setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
        return undefined;
      }
    },
    [_, activeAccountId, createAccount, setErrorBannerTextAtom, updateAccount],
  );

  return saveProfile;
};
