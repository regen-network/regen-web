import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'pages/ProjectEdit';
import { BasicInfoForm } from 'components/organisms';
import { BasicInfoFormSchemaType } from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { navigateNext } = useNavigateNext({ step: 'location', projectId });
  const { metadata, metadataSubmit, offChainProject, loading } =
    useProjectWithMetadata({
      projectId,
      isEdit,
      projectEditSubmit,
      navigateNext,
      onChainProject,
    });
  const initialValues: BasicInfoFormSchemaType = useMemo(
    () => ({
      'schema:name': metadata?.['schema:name'] ?? '',
      'regen:projectSize': metadata?.['regen:projectSize'] ?? {
        'qudt:numericValue': undefined,
        'qudt:unit': 'unit:HA',
      },
    }),
    [metadata],
  );

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Basic Info"
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <BasicInfoForm onSubmit={metadataSubmit} initialValues={initialValues} />
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
