import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import {
  ProjectLocationForm,
  ProjectLocationFormValues,
} from '../../components/organisms';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';

const ProjectLocation: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject } = useProjectEditContext();
  const { metadata } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
  });
  const [updateProject] = useUpdateProjectByIdMutation();

  let initialFieldValues: any | undefined;
  if (metadata) {
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
    if (isEdit) {
      // TODO initiate on-chain tx
    } else {
      try {
        await saveValues(values);
        navigateNext();
      } catch (e) {
        // TODO: Should we display the error banner here?
        // https://github.com/regen-network/regen-registry/issues/554
        console.error(e); // eslint-disable-line no-console
      }
    }
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/basic-info`);
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  async function saveValues(values: ProjectLocationFormValues): Promise<void> {
    await updateProject({
      variables: {
        input: {
          id: projectId,
          projectPatch: {
            metadata: { ...metadata, ...values },
          },
        },
      },
    });
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Location"
      saveAndExit={saveAndExit}
    >
      <ProjectLocationForm
        submit={submit}
        saveAndExit={saveAndExit}
        mapToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        initialValues={initialFieldValues}
        onPrev={navigatePrev}
        onNext={navigateNext}
      />
    </ProjectFormTemplate>
  );
};

export { ProjectLocation };
