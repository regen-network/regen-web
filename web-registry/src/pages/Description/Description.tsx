import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { DescriptionForm } from '../../components/organisms/DescriptionForm/DescriptionForm';
import { DescriptionSchemaType } from '../../components/organisms/DescriptionForm/DescriptionForm.schema';
import { useProjectEditContext } from '../ProjectEdit';

const Description: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata, metadataSubmit } = useProjectWithMetadata({
    projectId,
    isEdit,
    projectEditSubmit,
    navigateNext,
    onChainProject,
    anchored: false,
  });

  let initialFieldValues: DescriptionSchemaType | undefined;
  if (metadata) {
    initialFieldValues = {
      'schema:description': metadata['schema:description'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/media`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Description"
      saveAndExit={saveAndExit}
    >
      <DescriptionForm
        onSubmit={metadataSubmit}
        onNext={navigateNext}
        onPrev={navigatePrev}
        initialValues={initialFieldValues}
      />
    </ProjectFormTemplate>
  );
};

export { Description };
