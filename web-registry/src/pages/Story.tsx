import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import { StoryForm, StoryValues } from '../components/organisms';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';

const Story: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  let initialFieldValues: StoryValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://regen.network/landStory':
        metadata['http://regen.network/landStory'],
      'http://regen.network/landStewardStory':
        metadata['http://regen.network/landStory'],
      'http://regen.network/landStewardStoryTitle':
        metadata['http://regen.network/landStewardStoryTitle'],
      'http://regen.network/projectQuote':
        metadata['http://regen.network/projectQuote'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: StoryValues): Promise<void> {
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
      !isEdit && navigate(`/project-pages/${projectId}/media`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <StoryForm submit={submit} initialValues={initialFieldValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Story"
      saveAndExit={saveAndExit}
    >
      <StoryForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { Story };
