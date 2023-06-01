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
        if (addr) {
          const res = await createWallet({
            variables: {
              input: {
                wallet: {
                  addr,
                },
              },
            },
          });
          walletId = res.data?.createWallet?.wallet?.id;
        }
        const res = await createParty({
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
        const id = res.data?.createParty?.party?.id;
        const accountId = res.data?.createParty?.party?.accountId;

        setValue({ id, accountId, ...profile });
        closeProfileModal();
      } catch (e) {
        // TODO
        // setError(e);
      }
    },
    [closeProfileModal, createParty, createWallet, setValue],
  );

  return saveProfile;
};
