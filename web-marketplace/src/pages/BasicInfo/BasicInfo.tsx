import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProjectEditContext } from 'pages/ProjectEdit';
import WithLoader from 'components/atoms/WithLoader';
import { BasicInfoForm } from 'components/organisms';
import { BasicInfoSchemaType } from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';
import { DescriptionForm } from 'components/organisms/DescriptionForm/DescriptionForm';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
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

  const initialValues: BasicInfoSchemaType = useMemo(
    () => ({
      'schema:name': metadata?.['schema:name'] ?? '',
      'regen:projectSize': metadata?.['regen:projectSize'] ?? {
        'qudt:numericValue': 0,
        'qudt:unit': 'unit:HA',
      },
    }),
    [metadata],
  );

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
      project={offChainProject}
      loading={loading}
    >
      <BasicInfoForm
        onSubmit={metadataSubmit}
        onNext={navigateNext}
        initialValues={initialValues}
      />
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
