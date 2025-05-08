import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { msg, useLingui } from '@lingui/react';
import { useNavigateNext } from 'legacy-pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'legacy-pages/ProjectEdit';

import { LocationFormSchemaType } from 'components/organisms/LocationForm/LocationForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { LocationForm } from '../../components/organisms/LocationForm/LocationForm';

const ProjectLocation: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { navigateNext } = useNavigateNext({ step: 'roles', projectId });

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
      title={_(msg`Location`)}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <LocationForm
        onSubmit={metadataSubmit}
        mapToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
        initialValues={initialValues}
        onPrev={navigatePrev}
      />
    </ProjectFormTemplate>
  );
};

export { ProjectLocation };
