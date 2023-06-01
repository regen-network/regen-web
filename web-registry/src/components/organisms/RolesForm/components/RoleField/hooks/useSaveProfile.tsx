import { useCallback } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import {
  useCreatePartyMutation,
  useCreateWalletMutation,
} from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { ProfileModalSchemaType } from '../../ProfileModal/ProfileModal.schema';

type Params = {
  setValue: (value: ProfileModalSchemaType) => void;
  // setError: UseStateSetter<unknown>;
  closeProfileModal: () => void;
};

export const useSaveProfile = ({ setValue, closeProfileModal }: Params) => {
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const saveProfile = useCallback(
    async (profile: ProfileModalSchemaType): Promise<void> => {
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
        const id = partyRes.data?.createParty?.party?.id;
        closeProfileModal();
        setValue({ id, ...profile });
      } catch (e) {
        setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
      }
    },
    [
      closeProfileModal,
      createParty,
      createWallet,
      setErrorBannerTextAtom,
      setValue,
    ],
  );

  return saveProfile;
};
