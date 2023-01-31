import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { ProjectLocationForm } from '../../components/organisms';

const ProjectLocation: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, metadataSubmit } = useProjectWithMetadata({
    projectId,
    isEdit,
    projectEditSubmit,
    navigateNext,
    onChainProject,
  });

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

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/basic-info`);
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Location"
      saveAndExit={saveAndExit}
    >
      <ProjectLocationForm
        submit={metadataSubmit}
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
