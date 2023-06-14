import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import {
  useCreatePartyMutation,
  useCreateWalletMutation,
} from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { ProfileModalSchemaType } from '../components/ProfileModal/ProfileModal.schema';

export const useSaveProfile = () => {
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const saveProfile = useCallback(
    async (profile: ProfileModalSchemaType): Promise<string | undefined> => {
      try {
        let walletId;
        const addr = profile.address;
        if (addr) {
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
        const partyRes = await createParty({
          variables: {
            input: {
              party: {
                type: profile.profileType,
                name: profile.name,
                description: profile.description,
                image: profile.profileImage,
                walletId,
              },
            },
          },
        });
        return partyRes.data?.createParty?.party?.id;
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        return undefined;
      }
    },
    [createParty, createWallet, setErrorBannerTextAtom],
  );

  return saveProfile;
};
