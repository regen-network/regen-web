import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'pages/ProjectEdit';
import WithLoader from 'components/atoms/WithLoader';
import { DescriptionForm } from 'components/organisms/DescriptionForm/DescriptionForm';
import { DescriptionSchemaType } from 'components/organisms/DescriptionForm/DescriptionForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

const Description: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { navigateNext } = useNavigateNext({ step: 'media', projectId });

  const { metadata, metadataSubmit, offChainProject, loading } =
    useProjectWithMetadata({
      projectId,
      isEdit,
      projectEditSubmit,
      navigateNext,
      onChainProject,
      anchored: false,
    });

  const initialValues: DescriptionSchemaType = useMemo(
    () => ({
      'schema:description': metadata?.['schema:description'],
      'regen:story': metadata?.['regen:story'],
      'regen:storyTitle': metadata?.['regen:storyTitle'],
    }),
    [metadata],
  );

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Description"
      saveAndExit={saveAndExit}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <WithLoader
        isLoading={loading}
        sx={{ textAlign: 'center', mt: { xs: 6.5, sm: 9 } }}
      >
        <DescriptionForm
          onSubmit={metadataSubmit}
          onNext={navigateNext}
          onPrev={navigatePrev}
          initialValues={initialValues}
        />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Description };
