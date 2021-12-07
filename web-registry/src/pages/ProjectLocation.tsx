import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ProjectLocationForm, ProjectLocationFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import { ProjectFormProps } from './BasicInfo';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
  useUpdateAddressByIdMutation,
  useCreateAddressMutation,
} from '../generated/graphql';

const ProjectLocation: React.FC<ProjectFormProps> = ({ isEdit }) => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const [updateProject] = useUpdateProjectByIdMutation();
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressByIdMutation();
  const { data: projectData } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
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
      !isEdit && history.push(`/project-pages/${projectId}/roles`);
    } catch (e) {
      //   // TODO: Should we display the error banner here?
      //   // https://github.com/regen-network/regen-registry/issues/554
      console.error(e); // eslint-disable-line no-console
    }
  }

  async function saveValues(values: ProjectLocationFormValues): Promise<void> {
    const metadata = { ...projectData?.projectById?.metadata, ...values };
    const feature = values['http://schema.org/location'];
    let addressId = projectData?.projectById?.addressId;
    // if there's a current address associated with project, update it, otherwise create a new one
    if (!addressId) {
      const { data: addressData } = await createAddress({
        variables: {
          input: {
            address: {
              feature,
            },
          },
        },
      });
      addressId = addressData?.createAddress?.address?.id;
    } else {
      await updateAddress({
        variables: {
          input: {
            id: addressId,
            addressPatch: {
              feature,
            },
          },
        },
      });
    }

    await updateProject({
      variables: {
        input: {
          id: projectId,
          projectPatch: {
            metadata,
            addressId,
          },
        },
      },
    });
  }

  return isEdit ? (
    <ProjectLocationForm
      submit={submit}
      saveAndExit={saveAndExit}
      mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
      initialValues={initialFieldValues}
      isEdit
    />
  ) : (
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
