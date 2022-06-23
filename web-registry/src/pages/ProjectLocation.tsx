import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ProjectLocationForm,
  ProjectLocationFormValues,
} from '../components/organisms';
import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import { useProjectEditContext } from '../pages/ProjectEdit';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
  useUpdateAddressByIdMutation,
  useCreateAddressMutation,
} from '../generated/graphql';

const ProjectLocation: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

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
      'schema:location': metadata?.['schema:location'] || {},
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
      !isEdit && navigate(`/project-pages/${projectId}/roles`);
    } catch (e) {
      //   // TODO: Should we display the error banner here?
      //   // https://github.com/regen-network/regen-registry/issues/554
      console.error(e); // eslint-disable-line no-console
    }
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/basic-info`);
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  async function saveValues(values: ProjectLocationFormValues): Promise<void> {
    const metadata = { ...projectData?.projectById?.metadata, ...values };
    const feature = values['schema:location'];
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

  const Form = (): JSX.Element => (
    <ProjectLocationForm
      submit={submit}
      saveAndExit={saveAndExit}
      mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
      initialValues={initialFieldValues}
      onPrev={navigatePrev}
      onNext={navigateNext}
    />
  );

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Location"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { ProjectLocation };
