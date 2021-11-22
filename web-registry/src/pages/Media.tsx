import React from 'react';
import { useParams } from 'react-router-dom';

import { OnboardingFormTemplate } from '../components/templates';
import { MediaForm, MediaValues } from '../components/organisms';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';
import { ProjectFormProps } from './BasicInfo';

const Media: React.FC<ProjectFormProps> = ({ isEdit }) => {
  const { projectId } = useParams();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: MediaValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://regen.network/previewPhoto': metadata['http://regen.network/previewPhoto'],
      'http://regen.network/galleryPhotos': metadata['http://regen.network/galleryPhotos'],
      'http://regen.network/landStewardPhoto': metadata['http://regen.network/landStewardPhoto'],
      'http://regen.network/videoURL': metadata['http://regen.network/videoURL'],
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
    <MediaForm submit={submit} initialValues={initialFieldValues} isEdit />
  ) : (
    <OnboardingFormTemplate activeStep={0} title="Media" saveAndExit={saveAndExit}>
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { Media };
