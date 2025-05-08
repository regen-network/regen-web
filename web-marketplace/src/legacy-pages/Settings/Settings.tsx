import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { useNavigateNext } from 'legacy-pages/ProjectCreate/hooks/useNavigateNext';
import WithLoader from 'components/atoms/WithLoader';
import { SettingsForm } from 'components/organisms/SettingsForm/SettingsForm';
import { SettingsFormSchemaType } from 'components/organisms/SettingsForm/SettingsForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useProjectEditContext } from '../ProjectEdit';
import { useSettingsSubmit } from './hooks/useSettingsSubmit';

const Settings: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const { projectId } = useParams();
  const { navigateNext } = useNavigateNext({ step: 'description', projectId });

  const {
    isEdit,
    onChainProject,
    projectEditSubmit,
    isLoading: editContextLoading,
  } = useProjectEditContext();

  const { offChainProject, loading } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
    projectEditSubmit,
    navigateNext,
  });

  const { settingsSubmit } = useSettingsSubmit({ offChainProject });

  const initialValues: SettingsFormSchemaType = useMemo(
    () => ({
      slug:
        offChainProject?.slug ??
        onChainProject?.id ??
        offChainProject?.id ??
        '',
    }),
    [offChainProject, onChainProject],
  );

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title={_(msg`Settings`)}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={!offChainProject}
    >
      <WithLoader isLoading={editContextLoading || loading}>
        <SettingsForm submit={settingsSubmit} initialValues={initialValues} />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Settings };
