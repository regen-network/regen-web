import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ProjectLocationForm,
  ProjectLocationFormValues,
} from '../../components/organisms';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const ProjectLocation: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

  const [updateProject] = useUpdateProjectByIdMutation();
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
