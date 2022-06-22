import { useCallback } from 'react';
import { merge } from 'lodash';
import { cloneDeep } from 'lodash';
import { ProjectMetadataValues } from '../../../components/organisms';
import { ProjectByIdQuery } from '../../../generated/graphql';
import { useUpdateProjectByIdMutation } from '../../../generated/graphql';

type Props = {
  project?: ProjectByIdQuery['projectById'];
  projectId?: string;
  updateProject: ReturnType<typeof useUpdateProjectByIdMutation>[0];
};

type ReturnedType = (values: ProjectMetadataValues) => Promise<void>;

const useProjectMetadataSubmit = ({
  project,
  projectId,
  updateProject,
}: Props): ReturnedType => {
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

export default useProjectMetadataSubmit;
