import React from 'react';
import { useParams } from 'react-router-dom';

import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import { MediaForm, MediaValues } from '../components/organisms';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';

const Media: React.FC = () => {
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  let initialFieldValues: MediaValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'regen:previewPhoto': metadata['regen:previewPhoto'],
      'regen:galleryPhotos': metadata['regen:galleryPhotos'],
      'regen:landStewardPhoto': metadata['regen:landStewardPhoto'],
      'regen:videoURL': metadata['regen:videoURL'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: MediaValues): Promise<void> {
    const metadata = { ...data?.projectById?.metadata, ...values };
    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              metadata,
            },
          },
        },
      });
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Media"
      saveAndExit={saveAndExit}
    >
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { Media };
