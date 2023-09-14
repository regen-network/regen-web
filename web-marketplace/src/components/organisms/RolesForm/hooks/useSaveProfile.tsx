import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import {
  useCreatePartyMutation,
  useCreateWalletMutation,
  useUpdatePartyByIdMutation,
} from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { ProfileModalSchemaType } from '../components/ProfileModal/ProfileModal.schema';

export const useSaveProfile = () => {
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();
  const [updateParty] = useUpdatePartyByIdMutation();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { accountId } = useWallet();

  const saveProfile = useCallback(
    async (
      profile: ProfileModalSchemaType,
      initialValue?: ProfileModalSchemaType | null,
    ): Promise<{ id: string; creatorId: string } | undefined> => {
      const edit =
        !!profile.creatorId && profile.creatorId === accountId && !!profile.id;
      try {
        let walletId;
        const addr = profile.address;
        if (!!addr && addr !== initialValue?.address) {
          const walletRes = await createWallet({
            variables: {
              input: {
                wallet: {
                  addr,
                },
              },
            },
          });
          walletId = walletRes.data?.createWallet?.wallet?.id;
        }
        if (edit) {
          await updateParty({
            variables: {
              input: {
                id: profile.id,
                partyPatch: {
                  type: profile.profileType,
                  name: profile.name,
                  description: profile.description,
                  image: profile.profileImage,
                  walletId,
                  creatorId: accountId,
                },
              },
            },
          });
          return { id: profile.id, creatorId: accountId };
        } else {
          const partyRes = await createParty({
            variables: {
              input: {
                party: {
                  type: profile.profileType,
                  name: profile.name,
                  description: profile.description,
                  image: profile.profileImage,
                  walletId,
                  creatorId: accountId,
                },
              },
            },
          });
          return {
            id: partyRes.data?.createParty?.party?.id,
            creatorId: accountId,
          };
        }
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        return undefined;
      }
    },
    [accountId, createParty, createWallet, setErrorBannerTextAtom, updateParty],
  );

  return saveProfile;
};
