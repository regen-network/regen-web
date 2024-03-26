import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'pages/ProjectEdit';
import { LocationFormSchemaType } from 'components/organisms/LocationForm/LocationForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { LocationForm } from '../../components/organisms/LocationForm/LocationForm';

const ProjectLocation: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { navigateNext } = useNavigateNext({ step: 'description', projectId });

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

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/basic-info`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Location"
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <LocationForm
        onSubmit={metadataSubmit}
        mapToken={import.meta.env.VITE_MAPBOX_TOKEN as string}
        initialValues={initialValues}
        onPrev={navigatePrev}
      />
    </ProjectFormTemplate>
  );
};

export { ProjectLocation };
