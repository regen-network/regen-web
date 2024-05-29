import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAllCreateProjectPageQuery } from 'lib/queries/react-query/sanity/getAllCreateProjectPageQuery/getAllCreateProjectPageQuery';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'pages/ProjectEdit';
import { BasicInfoForm } from 'components/organisms';
import { BasicInfoFormSchemaType } from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';
import { client as sanityClient } from '../../lib/clients/sanity';
import { CreateProjectPageModal } from './BasicInfo.CreateProjectPageModal';

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

  const { creditClassOnChainId } = useCreateProjectContext();
  const { data: sanityCreateProjectPageData } = useQuery(
    getAllCreateProjectPageQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const [open, setOpen] = useState(false);

  useEffect(
    () =>
      setOpen(
        !isEdit && !creditClassOnChainId && !!sanityCreateProjectPageData,
      ),
    [isEdit, creditClassOnChainId, sanityCreateProjectPageData],
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
      {sanityCreateProjectPageData && (
        <CreateProjectPageModal
          sanityCreateProjectPageData={sanityCreateProjectPageData}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
