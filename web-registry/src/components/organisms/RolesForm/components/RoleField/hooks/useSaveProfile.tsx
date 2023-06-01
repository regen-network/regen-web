import { useCallback } from 'react';

import {
  useCreatePartyMutation,
  useCreateWalletMutation,
} from 'generated/graphql';

import { ProfileModalSchemaType } from '../../ProfileModal/ProfileModal.schema';

type Params = {
  setValue: (value: ProfileModalSchemaType) => void;
  // setError: UseStateSetter<unknown>;
  closeProfileModal: () => void;
};

export const useSaveProfile = ({ setValue, closeProfileModal }: Params) => {
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();

  const saveProfile = useCallback(
    async (profile: ProfileModalSchemaType): Promise<void> => {
      try {
        let walletId;
        const addr = profile.address;
        console.log('saveProfile');
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
        const accountId = partyRes.data?.createParty?.party?.accountId;

        setValue({ id, accountId, ...profile });
        closeProfileModal();
      } catch (e) {
        console.log(e);
        // TODO
        // setError(e);
      }
    },
    [closeProfileModal, createParty, createWallet, setValue],
  );

  return saveProfile;
};
