import { useCallback } from 'react';

import { useUpdateProjectByIdMutation } from 'generated/graphql';

import { ReturnType as ProjectEditSubmitReturnType } from 'pages/ProjectEdit/hooks/useProjectEditSubmit';
import {
  BasicInfoFormValues,
  ProjectLocationFormValues,
} from 'components/organisms';

type Props = {
  projectId?: string;
  isEdit?: boolean;
  projectEditSubmit: ProjectEditSubmitReturnType;
  navigateNext: () => void;
  metadata: any; // TODO update metadata type
};

type Values = BasicInfoFormValues | ProjectLocationFormValues;
type ReturnType = (values: Values) => Promise<void>;

const useProjectAnchoredMetadataSubmit = ({
  projectId,
  isEdit,
  projectEditSubmit,
  navigateNext,
  metadata,
}: Props): ReturnType => {
  const [updateProject] = useUpdateProjectByIdMutation();

  const projectAnchoredMetadataSubmit = useCallback(
    async (values: Values): Promise<void> => {
      const newMetadata = { ...metadata, ...values };
      if (isEdit) {
        await projectEditSubmit(newMetadata);
      } else {
        try {
          await updateProject({
            variables: {
              input: {
                id: projectId,
                projectPatch: {
                  metadata: newMetadata,
                },
              },
            },
          });
          navigateNext();
        } catch (e) {
          // TODO: Should we display the error banner here?
          // https://github.com/regen-network/regen-registry/issues/554
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    },
    [
      isEdit,
      metadata,
      navigateNext,
      projectEditSubmit,
      projectId,
      updateProject,
    ],
  );

  return projectAnchoredMetadataSubmit;
};

export default useProjectAnchoredMetadataSubmit;
