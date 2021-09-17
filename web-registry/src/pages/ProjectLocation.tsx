import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ProjectLocationForm, ProjectLocationFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';

const ProjectLocation: React.FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data: projectData } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: any | undefined;
  if (projectData?.projectById?.metadata) {
    const metadata = projectData.projectById.metadata;
    initialFieldValues = {
      '@context': {
        '@vocab': 'https://purl.org/geojson/vocab#',
        type: '@type',
        coordinates: { '@container': '@list' },
      },
      'http://schema.org/location': metadata?.['http://schema.org/location'] || '',
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO functionality - might need to save form state in this file to pass
    // to `OnboardingFormTemplate`, or wrap this whole page in the Formik Form
    // so it can access values: https://github.com/regen-network/regen-registry/issues/561
  }

  async function submit(values: ProjectLocationFormValues): Promise<void> {
    await saveValues(values);
    history.push(`/project-pages/${projectId}/roles`);
  }

  async function saveValues(values: ProjectLocationFormValues): Promise<void> {
    const metadata = { ...projectData?.projectById?.metadata, ...values };
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
      // https://github.com/regen-network/regen-registry/issues/555
      console.error('error saving location', e); // eslint-disable-line no-console
    }
  }

  return (
    <OnboardingFormTemplate activeStep={0} title="Location" saveAndExit={saveAndExit}>
      <ProjectLocationForm
        submit={submit}
        saveAndExit={saveAndExit}
        mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        initialValues={initialFieldValues}
      />
    </OnboardingFormTemplate>
  );
};

export { ProjectLocation };
