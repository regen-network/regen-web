import { useCallback } from 'react';

import {
  PartyType,
  ProjectPatch,
  useUpdateProjectByIdMutation,
} from 'generated/graphql';
import { NestedPartial } from 'types/nested-partial';
import {
  AnchoredProjectMetadataBaseLD,
  ProjectMetadataLD,
  ProjectStakeholder,
  REGEN_INDIVIDUAL,
  REGEN_ORGANIZATION,
} from 'lib/db/types/json-ld';

import { UseProjectEditSubmitParams } from 'pages/ProjectEdit/hooks/useProjectEditSubmit';
import { ProfileModalSchemaType } from 'components/organisms/RolesForm/components/ProfileModal/ProfileModal.schema';
import { RolesFormSchemaType } from 'components/organisms/RolesForm/RolesForm.schema';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

interface Props {
  offChainProject?: OffChainProject;
  metadata?: NestedPartial<ProjectMetadataLD>;
  projectEditSubmit: UseProjectEditSubmitParams;
  isEdit?: boolean;
  metadataReload: () => Promise<void>;
  navigateNext: () => void;
}

type Return = {
  rolesSubmit: (values: RolesFormSchemaType) => Promise<void>;
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

  const rolesSubmit = useCallback(
    async (values: RolesFormSchemaType): Promise<void> => {
      try {
        let doUpdate = false;
        let projectPatch: ProjectPatch = {};
        const { projectDeveloper, verifier } = values;
        if (offChainProject?.partyByDeveloperId !== projectDeveloper?.id) {
          doUpdate = true;
          projectPatch.developerId = projectDeveloper?.id || null;
        }
        if (offChainProject?.partyByVerifierId !== verifier?.id) {
          doUpdate = true;
          projectPatch.verifierId = verifier?.id || null;
        }

        const newMetadata = {
          ...metadata,
          ...getProjectStakeholders(values),
        } as NestedPartial<ProjectMetadataLD>;

        // In creation mode, we store all metadata in the off-chain table project.metadata temporarily
        if (!isEdit)
          projectPatch = {
            metadata: newMetadata,
            ...projectPatch,
          };
        // In creation or edit mode, we always store references to the project stakeholders in the project table
        // which should be in projectPatch if new or updated
        if (doUpdate) {
          await updateProject({
            variables: {
              input: {
                id: offChainProject?.id,
                projectPatch,
              },
            },
          });
        }

        if (!isEdit) {
          navigateNext();
        } else {
          // In edit mode, we need to update the project on-chain metadata if needed
          if (doUpdate) {
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
      offChainProject?.partyByVerifierId,
      offChainProject?.id,
      metadata,
      isEdit,
      metadataReload,
      updateProject,
      navigateNext,
      projectEditSubmit,
    ],
  );

  return { rolesSubmit };
};

function getProjectStakeholder(
  values: ProfileModalSchemaType,
): ProjectStakeholder {
  return {
    '@type':
      values.profileType === PartyType.User
        ? REGEN_INDIVIDUAL
        : REGEN_ORGANIZATION,
    'schema:name': values.name,
    'schema:description': values.description,
    'schema:image': values.profileImage,
    'regen:address': values.address,
  };
}

type GetProjectStakeholdersReturn = Pick<
  AnchoredProjectMetadataBaseLD,
  'regen:projectDeveloper' | 'regen:projectVerifier'
>;
function getProjectStakeholders(
  values: RolesFormSchemaType,
): GetProjectStakeholdersReturn {
  const metadata: GetProjectStakeholdersReturn = {};
  metadata['regen:projectDeveloper'] = values.projectDeveloper
    ? getProjectStakeholder(values.projectDeveloper)
    : undefined;
  metadata['regen:projectVerifier'] = values.verifier
    ? getProjectStakeholder(values.verifier)
    : undefined;
  return metadata;
}

export { useRolesSubmit };
