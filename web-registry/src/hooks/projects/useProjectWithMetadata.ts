import { useCallback } from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ProjectByIdQuery,
  ProjectByOnChainIdQuery,
  useUpdateProjectByIdMutation,
} from 'generated/graphql';
import { graphqlClient } from 'lib/clients/graphqlClient';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectKey } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery.constants';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectByOnChainIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery.constants';

import { UseProjectEditSubmitParams } from 'pages/ProjectEdit/hooks/useProjectEditSubmit';
import {
  BasicInfoFormValues,
  DescriptionFormValues,
  ProjectLocationFormValues,
} from 'components/organisms';
import { MediaFormValues } from 'components/organisms/MediaForm';

export type OffChainProject =
  | ProjectByIdQuery['projectById']
  | ProjectByOnChainIdQuery['projectByOnChainId'];

interface Props {
  projectId?: string;
  isEdit?: boolean;
  projectEditSubmit: UseProjectEditSubmitParams;
  navigateNext: () => void;
  anchored?: boolean;
  onChainProject?: ProjectInfo;
}

export interface MetadataSubmitProps {
  values: Values;
  overwrite?: boolean;
}

interface Res {
  offChainProject?: OffChainProject;
  metadata?: Partial<ProjectMetadataLD>;
  metadataReload: () => Promise<void>;
  metadataSubmit: (p: MetadataSubmitProps) => Promise<void>;
}

type Values =
  | BasicInfoFormValues
  | ProjectLocationFormValues
  | DescriptionFormValues
  | MediaFormValues
  | Partial<ProjectMetadataLD>;

export const useProjectWithMetadata = ({
  projectId,
  isEdit,
  onChainProject,
  navigateNext,
  projectEditSubmit,
  anchored = true,
}: Props): Res => {
  let metadata: Partial<ProjectMetadataLD> | undefined;
  let offChainProject: OffChainProject | undefined;
  const reactQueryClient = useQueryClient();
  const [updateProject] = useUpdateProjectByIdMutation();

  // In project creation mode, we query the off-chain project since there's no on-chain project yet.
  // In this case, the router param projectId is the off-chain project uuid.
  const create = !!projectId && !isEdit;
  const { data: projectByOffChainIdRes } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      enabled: create,
      id: projectId,
    }),
  );
  const projectById = projectByOffChainIdRes?.data?.projectById;
  if (create && projectById) {
    offChainProject = projectById;
    metadata = projectById.metadata;
  }

  // In project edit mode, we can query the on-chain (anchored) project metadata.
  // In this case, the router param projectId is the on-chain project id.
  const edit = !!projectId && isEdit;
  // Metadata
  const { data: anchoredMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      enabled: !!onChainProject?.metadata && edit && anchored,
    }),
  );
  const { data: projectByOnChainIdRes } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: edit,
      onChainId: projectId as string,
    }),
  );
  // Select metadata
  if (edit) {
    offChainProject = projectByOnChainIdRes?.data?.projectByOnChainId;
    if (anchored) {
      metadata = anchoredMetadata;
    } else {
      metadata = offChainProject?.metadata;
    }
  }
  // Create Reload and Submit callbacks
  const metadataReload = useCallback(async (): Promise<void> => {
    if (create) {
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByIdKey(projectId),
      });
    }
    if (edit) {
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectKey(projectId),
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByOnChainIdKey(projectId),
      });
    }
  }, [create, edit, reactQueryClient, projectId]);

  const metadataSubmit = useCallback(
    async ({
      values,
      overwrite = false,
    }: MetadataSubmitProps): Promise<void> => {
      let newMetadata = values;
      if (!overwrite) {
        newMetadata = { ...metadata, ...values };
      }
      try {
        if (isEdit && anchored) {
          await projectEditSubmit(newMetadata);
        } else {
          await updateProject({
            variables: {
              input: {
                id: offChainProject?.id,
                projectPatch: {
                  metadata: newMetadata,
                },
              },
            },
          });
          !isEdit && navigateNext();
        }
        await metadataReload();
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    [
      metadata,
      isEdit,
      anchored,
      metadataReload,
      projectEditSubmit,
      updateProject,
      offChainProject?.id,
      navigateNext,
    ],
  );

  return {
    offChainProject,
    metadata,
    metadataReload,
    metadataSubmit,
  };
};
