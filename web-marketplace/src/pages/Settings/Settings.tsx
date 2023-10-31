import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import WithLoader from 'components/atoms/WithLoader';
import { SettingsForm } from 'components/organisms/SettingsForm/SettingsForm';
import { SettingsFormSchemaType } from 'components/organisms/SettingsForm/SettingsForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { useProjectEditContext } from '../ProjectEdit';
import { useSettingsSubmit } from './hooks/useSettingsSubmit';

const Settings: React.FC<React.PropsWithChildren<unknown>> = () => {
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

  const saveAndExit = useProjectSaveAndExit();

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Settings"
      saveAndExit={saveAndExit}
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
