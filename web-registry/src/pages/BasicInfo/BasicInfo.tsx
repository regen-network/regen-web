import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import useProjectAnchoredMetadataSubmit from 'hooks/projects/useProjectAnchoredMetadataSubmit';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { BasicInfoForm, BasicInfoFormValues } from '../../components/organisms';
import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { metadata } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
  });
  const projectAnchoredMetadataSubmit = useProjectAnchoredMetadataSubmit({
    projectId,
    isEdit,
    projectEditSubmit,
    navigateNext,
    metadata,
  });

  let initialFieldValues: BasicInfoFormValues | undefined;
  if (metadata) {
    initialFieldValues = {
      'schema:name': metadata['schema:name'],
      'regen:projectSize': metadata['regen:projectSize'],
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/location`);
  }
  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Basic Info"
      saveAndExit={saveAndExit}
    >
      <BasicInfoForm
        submit={projectAnchoredMetadataSubmit}
        initialValues={initialFieldValues}
        onNext={navigateNext}
      />
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
