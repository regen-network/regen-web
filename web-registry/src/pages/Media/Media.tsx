import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../../components/templates';
import { MediaForm, MediaValues } from '../../components/organisms';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const Media: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = data?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;

  let initialFieldValues: MediaValues | undefined;
  if (project?.metadata) {
    const metadata = project.metadata;
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

  function navigateNext(): void {
    // TODO: replace 'review' with path name once
    // https://github.com/regen-network/regen-registry/issues/447 is merged
    const nextStep = creditClassId ? 'metadata' : 'review';
    navigate(`/project-pages/${projectId}/${nextStep}`);
  }

  function navigatePrev(): void {
    const prevStep = creditClassId ? 'story' : 'description';
    navigate(`/project-pages/${projectId}/${prevStep}`);
  }

  async function submit(values: MediaValues): Promise<void> {
    const metadata = { ...project?.metadata, ...values };
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
      if (!isEdit) navigateNext();
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  const Form = (): JSX.Element => (
    <MediaForm
      submit={submit}
      initialValues={initialFieldValues}
      onNext={navigateNext}
      onPrev={navigatePrev}
    />
  );

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Media"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { Media };
