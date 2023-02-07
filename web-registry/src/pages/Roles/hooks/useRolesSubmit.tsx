import { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';

import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';

import {
  PartyType,
  ProjectPatch,
  useCreatePartyMutation,
  useCreateWalletMutation,
  useUpdatePartyByIdMutation,
  useUpdateProjectByIdMutation,
  useUpdateWalletByIdMutation,
} from 'generated/graphql';

import { UseProjectEditSubmitParams } from 'pages/ProjectEdit/hooks/useProjectEditSubmit';
import { RolesValues } from 'components/organisms';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

interface Props {
  offChainProject?: OffChainProject;
  metadata: any; // TODO update with proper type
  projectEditSubmit: UseProjectEditSubmitParams;
  isEdit?: boolean;
  metadataReload: () => Promise<void>;
  navigateNext: () => void;
}

type Return = {
  rolesSubmit: (values: RolesValues) => Promise<void>;
};

const useRolesSubmit = ({
  projectEditSubmit,
  offChainProject,
  metadata,
  isEdit,
  metadataReload,
  navigateNext,
}: Props): Return => {
  const [updateProject] = useUpdateProjectByIdMutation();
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();
  const [updateWallet] = useUpdateWalletByIdMutation();
  const [updateParty] = useUpdatePartyByIdMutation();

  const rolesSubmit = useCallback(
    async (values: RolesValues): Promise<void> => {
      try {
        let projectPatch: ProjectPatch = {};
        const developer = values['regen:projectDeveloper'];
        const existingDeveloperParty = offChainProject?.partyByDeveloperId;
        const existingDeveloperWallet =
          existingDeveloperParty?.walletByWalletId;
        let doUpdateMetadata = false;
        if (!isEmpty(developer)) {
          // 1. Handle wallet creation / update
          // This will just fail if there's already a wallet existing with given addr
          let walletId;
          const addr = developer['regen:address'];
          if (addr) {
            // The project developer associated wallet hasn't been created yet
            if (!existingDeveloperWallet) {
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
            } else if (
              // New address is different from existing one
              existingDeveloperWallet.addr !== addr
            ) {
              walletId = existingDeveloperWallet.id;
              await updateWallet({
                variables: {
                  input: {
                    id: walletId,
                    walletPatch: {
                      addr,
                    },
                  },
                },
              });
            }
          }

          // 2. Handle party creation / update
          // The project developer associated party hasn't been created yet
          doUpdateMetadata =
            developer['schema:name'] !== existingDeveloperParty?.name ||
            developer['schema:description'] !==
              existingDeveloperParty?.description ||
            developer['schema:image'] !== existingDeveloperParty?.image ||
            walletId;
          if (!existingDeveloperParty) {
            const res = await createParty({
              variables: {
                input: {
                  party: {
                    type:
                      // TODO: extract reusable function and use constant
                      developer['@type'] === 'regen:Individual'
                        ? PartyType.User
                        : PartyType.Organization,
                    name: developer['schema:name'],
                    description: developer['schema:description'],
                    image: developer['schema:image'],
                    walletId,
                  },
                },
              },
            });
            const developerId = res.data?.createParty?.party?.id;
            projectPatch = { developerId };
          } else if (doUpdateMetadata) {
            await updateParty({
              variables: {
                input: {
                  id: developer.id,
                  partyPatch: {
                    name: developer['schema:name'],
                    description: developer['schema:description'],
                    image: developer['schema:image'],
                    walletId,
                  },
                },
              },
            });
          }
        }

        const newMetadata = { ...metadata, ...stripIds(values) };
        // In creation mode, we store all metadata in the off-chain table project.metadata temporarily
        if (!isEdit)
          projectPatch = {
            metadata: newMetadata,
            ...projectPatch,
          };
        // In creation or edit mode, we always store references to the project stakeholders in the project table
        // which should be in projectPatch if new or updated
        await updateProject({
          variables: {
            input: {
              id: offChainProject?.id,
              projectPatch,
            },
          },
        });
        if (!isEdit) {
          navigateNext();
        } else {
          // In edit mode, we need to update the project on-chain metadata if needed
          if (doUpdateMetadata) {
            await projectEditSubmit(newMetadata);
          }
        }
        await metadataReload();
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // console.log(e);
      }
    },
    [
      offChainProject?.partyByDeveloperId,
      offChainProject?.id,
      metadata,
      isEdit,
      updateProject,
      metadataReload,
      createWallet,
      updateWallet,
      createParty,
      updateParty,
      navigateNext,
      projectEditSubmit,
    ],
  );

  return { rolesSubmit };
};

function stripPartyIds(values: ProfileFormValues): ProfileFormValues {
  delete values.id;

  return values;
}

function stripIds(values: RolesValues): RolesValues {
  if (values['regen:projectDeveloper']) {
    return {
      'regen:projectDeveloper': stripPartyIds(values['regen:projectDeveloper']),
    };
  }
  return values;
}

export { useRolesSubmit };
