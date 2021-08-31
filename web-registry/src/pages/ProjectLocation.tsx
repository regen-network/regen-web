import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ProjectLocationForm, ProjectLocationFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';

const ProjectLocation: React.FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: any | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://schema.org/location': metadata['http://schema.org/location'],
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: ProjectLocationFormValues): Promise<void> {
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
      history.push(`/project-pages/${projectId}/roles`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/555
      console.log(e);
    }
  }

  return (
    <OnboardingFormTemplate activeStep={0} title="Location" saveAndExit={saveAndExit}>
      <ProjectLocationForm
        submit={submit}
        mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        initialValues={initialFieldValues}
      />
    </OnboardingFormTemplate>
  );
};

export { ProjectLocation };
