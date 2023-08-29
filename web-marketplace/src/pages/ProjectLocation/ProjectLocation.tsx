import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import { LocationFormSchemaType } from 'components/organisms/LocationForm/LocationForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { LocationForm } from '../../components/organisms/LocationForm/LocationForm';

const ProjectLocation: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, metadataSubmit, offChainProject, loading } =
    useProjectWithMetadata({
      projectId,
      isEdit,
      projectEditSubmit,
      navigateNext,
      onChainProject,
    });

  const initialValues: LocationFormSchemaType = useMemo(
    () => ({
      'schema:location': metadata?.['schema:location'] ?? '',
    }),
    [metadata],
  );

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
      project={offChainProject}
      loading={loading}
    >
      <LocationForm
        onSubmit={metadataSubmit}
        mapToken={import.meta.env.VITE_MAPBOX_TOKEN as string}
        initialValues={initialValues}
        onPrev={navigatePrev}
        onNext={navigateNext}
      />
    </ProjectFormTemplate>
  );
};

export { ProjectLocation };
