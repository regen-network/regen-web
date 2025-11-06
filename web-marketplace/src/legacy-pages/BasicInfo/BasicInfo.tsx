import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCreateProjectContext } from 'legacy-pages/ProjectCreate';
import { useNavigateNext } from 'legacy-pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectEditContext } from 'legacy-pages/ProjectEdit';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getAllCreateProjectPageQuery } from 'lib/queries/react-query/sanity/getAllCreateProjectPageQuery/getAllCreateProjectPageQuery';

import { BasicInfoForm } from 'components/organisms';
import { BasicInfoFormSchemaType } from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { ProjectFormTemplate } from '../../components/templates/ProjectFormTemplate';
import { client as sanityClient } from '../../lib/clients/apolloSanity';
import { CreateProjectPageModal } from './BasicInfo.CreateProjectPageModal';

const BasicInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
  const { creditClassOnChainId, hasModalBeenViewed, setHasModalBeenViewed } =
    useCreateProjectContext();
  const { data: sanityCreateProjectPageData } = useQuery(
    getAllCreateProjectPageQuery({
      sanityClient,
      enabled: !!sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const [open, setOpen] = useState(false);

  useEffect(
    () =>
      setOpen(
        !isEdit && !creditClassOnChainId && !!sanityCreateProjectPageData,
      ),
    [isEdit, creditClassOnChainId, sanityCreateProjectPageData],
  );

  const onClose = () => {
    setOpen(false);
    setHasModalBeenViewed(true);
  };

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title={_(msg`Basic Info`)}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <BasicInfoForm onSubmit={metadataSubmit} initialValues={initialValues} />
      {sanityCreateProjectPageData && !hasModalBeenViewed && (
        <CreateProjectPageModal
          sanityCreateProjectPageData={sanityCreateProjectPageData}
          open={open}
          onClose={onClose}
        />
      )}
    </ProjectFormTemplate>
  );
};

export { BasicInfo };
