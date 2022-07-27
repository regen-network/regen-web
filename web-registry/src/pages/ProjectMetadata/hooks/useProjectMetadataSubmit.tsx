import { useCallback } from 'react';
import { cloneDeep, merge } from 'lodash';

import { ProjectMetadataValues } from '../../../components/organisms';
import {
  ProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../../../generated/graphql';

type Props = {
  project?: ProjectByIdQuery['projectById'];
  projectId?: string;
  updateProject: ReturnType<typeof useUpdateProjectByIdMutation>[0];
};

export type useProjectMetadataSubmitReturnedType = (
  values: ProjectMetadataValues,
) => Promise<void>;

export const useProjectMetadataSubmit = ({
  project,
  projectId,
  updateProject,
}: Props): useProjectMetadataSubmitReturnedType => {
  const projectMetadataSubmit = useCallback(
    async function submit(values: ProjectMetadataValues): Promise<void> {
      const parsedMetaData = JSON.parse(values.metadata);
      const projectMetadata = cloneDeep(project?.metadata);
      merge(projectMetadata, parsedMetaData);

      try {
        await updateProject({
          variables: {
            input: {
              id: projectId,
              projectPatch: {
                metadata: projectMetadata,
              },
            },
          },
        });
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
      }
    },
    [project, projectId, updateProject],
  );

  return projectMetadataSubmit;
};
