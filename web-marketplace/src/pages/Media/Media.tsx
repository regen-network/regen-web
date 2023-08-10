import { useNavigate, useParams } from 'react-router-dom';

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

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/metadata`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Media"
      saveAndExit={saveAndExit}
      project={offChainProject}
      loading={loading}
    >
      <WithLoader
        isLoading={!metadata}
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
