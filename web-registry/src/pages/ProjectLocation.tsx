import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ProjectLocationForm, ProjectLocationFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
  useCreateAddressMutation,
} from '../generated/graphql';

const ProjectLocation: React.FC = () => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const [updateProject] = useUpdateProjectByIdMutation();
  const [createAddress] = useCreateAddressMutation();
  const { data: projectData } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: any | undefined;
  if (projectData?.projectById?.metadata) {
    const metadata = projectData.projectById.metadata;
    initialFieldValues = {
      'http://schema.org/location': metadata?.['http://schema.org/location'] || {},
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO functionality - might need to save form state in this file to pass
    // to `OnboardingFormTemplate`, or wrap this whole page in the Formik Form
    // so it can access values: https://github.com/regen-network/regen-registry/issues/561
  }

  async function submit(values: ProjectLocationFormValues): Promise<void> {
    try {
      await saveValues(values);
      history.push(`/project-pages/${projectId}/roles`);
    } catch (e) {
      //   // TODO: Should we display the error banner here?
      //   // https://github.com/regen-network/regen-registry/issues/554
      console.error(e); // eslint-disable-line no-console
    }
  }

  async function saveValues(values: ProjectLocationFormValues): Promise<void> {
    const metadata = { ...projectData?.projectById?.metadata, ...values };
    const { data: addressData } = await createAddress({
      variables: {
        input: {
          address: {
            feature: values['http://schema.org/location'],
          },
        },
      },
    });

    await updateProject({
      variables: {
        input: {
          id: projectId,
          projectPatch: {
            metadata,
            addressId: addressData?.createAddress?.address?.id,
          },
        },
      },
    });
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
