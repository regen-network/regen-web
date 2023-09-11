import { useNavigate, useParams } from 'react-router-dom';

import { useNavigateNext } from 'pages/ProjectCreate/hooks/useNavigateNext';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import WithLoader from 'components/atoms/WithLoader';
import { MediaFormSchemaType } from 'components/organisms/MediaForm/MediaForm.schema';
import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { MediaForm } from '../../components/organisms/MediaForm';
import { useProjectEditContext } from '../ProjectEdit';

const Media = (): JSX.Element => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { navigateNext } = useNavigateNext({ step: 'metadata', projectId });
  const { offChainProject, metadata, metadataSubmit, loading } =
    useProjectWithMetadata({
      projectId,
      isEdit,
      projectEditSubmit,
      navigateNext,
      onChainProject,
      anchored: false,
    });

  const initialValues: MediaFormSchemaType = {
    'regen:previewPhoto': metadata?.['regen:previewPhoto'] ?? {
      'schema:url': '',
      'schema:creditText': '',
    },
    'regen:galleryPhotos': metadata?.['regen:galleryPhotos'],
    'regen:storyMedia': metadata?.['regen:storyMedia'] ?? {
      '@type': 'schema:VideoObject',
      'schema:url': '',
      'schema:creditText': '',
    },
  };

  const saveAndExit = useProjectSaveAndExit();

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Media"
      saveAndExit={saveAndExit}
      offChainProject={offChainProject}
      onChainProject={onChainProject}
      loading={loading}
    >
      <WithLoader
        isLoading={loading}
        sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <MediaForm
          submit={metadataSubmit}
          initialValues={initialValues}
          onNext={navigateNext}
          onPrev={navigatePrev}
          projectId={offChainProject?.id}
        />
      </WithLoader>
    </ProjectFormTemplate>
  );
};

export { Media };
