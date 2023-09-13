import { useCallback } from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { PartyType, ProjectPatch } from 'generated/graphql';
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
import { useCreateOrUpdateProject } from 'hooks/projects/UseCreateOrUpdateProject';
import { OffChainProject } from 'hooks/projects/useProjectWithMetadata';

interface Props {
  offChainProject?: OffChainProject;
  onChainProject?: ProjectInfo;
  metadata?: NestedPartial<ProjectMetadataLD>;
  projectEditSubmit: UseProjectEditSubmitParams;
  isEdit?: boolean;
  metadataReload: () => Promise<void>;
  navigateNext: () => void;
  admin?: string;
}

export type RoleSubmitProps = {
  values: RolesFormSchemaType;
  adminWalletId?: string;
  shouldNavigate?: boolean;
};

export type Return = {
  rolesSubmit: (props: RoleSubmitProps) => Promise<void>;
};

const useRolesSubmit = ({
  projectEditSubmit,
  offChainProject,
  onChainProject,
  metadata,
  isEdit,
  metadataReload,
  navigateNext,
  admin,
}: Props): Return => {
  const { createOrUpdateProject } = useCreateOrUpdateProject();

  const rolesSubmit = useCallback(
    async ({
      values,
      adminWalletId,
      shouldNavigate = true,
    }: RoleSubmitProps): Promise<void> => {
      try {
        let doUpdateMetadata = false;
        let doUpdateAdmin = false;
        let projectPatch: ProjectPatch = {};
        const { projectDeveloper, verifier } = values;

        // Compared values below can be undefined and null but in this case,
        // this means there was no project developer/verifier and this hasn't changed,
        // so we don't want to update the metadata.
        if (
          (offChainProject?.partyByDeveloperId || null) !==
          (projectDeveloper?.id || null)
        ) {
          doUpdateMetadata = true;
          projectPatch.developerId = projectDeveloper?.id || null;
        }
        if (
          (offChainProject?.partyByVerifierId || null) !==
          (verifier?.id || null)
        ) {
          doUpdateMetadata = true;
          projectPatch.verifierId = verifier?.id || null;
        }
        if (values.admin && admin !== values.admin) {
          doUpdateAdmin = true;
          if (adminWalletId) {
            projectPatch.adminWalletId = adminWalletId;
          }
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
        if (doUpdateMetadata || doUpdateAdmin) {
          // In edit mode, we need to update the project on-chain metadata and/or admin if needed
          if (isEdit) {
            await projectEditSubmit(
              newMetadata,
              values.admin,
              doUpdateMetadata,
              doUpdateAdmin,
            );
          }
          await createOrUpdateProject({
            offChainProjectId: offChainProject?.id,
            projectPatch,
          });
          await metadataReload();
        }

        if (!isEdit && shouldNavigate) {
          navigateNext();
        }
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // console.log(e);
      }
    },
    [
      offChainProject,
      admin,
      metadata,
      isEdit,
      createOrUpdateProject,
      metadataReload,
      projectEditSubmit,
      navigateNext,
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
