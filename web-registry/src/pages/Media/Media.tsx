import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import {
  MediaForm,
  MediaValuesSimple,
} from '../../components/organisms/MediaForm';
import { useProjectEditContext } from '../ProjectEdit';

const Media = (): JSX.Element => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject, projectEditSubmit } = useProjectEditContext();
  const { offChainProject, metadata, metadataSubmit } = useProjectWithMetadata({
    projectId,
    isEdit,
    projectEditSubmit,
    navigateNext,
    onChainProject,
    anchored: false,
  });

  // TODO validation regen-registry/issues/1501
  // Get ProjectPage SHACL graph (to validate unanchored data)
  // const { data: graphData } = useShaclGraphByUriQuery({
  //   variables: {
  //     uri: getProjectPageShapeIri(),
  //   },
  // });

  function getInitialFormValues(): MediaValuesSimple {
    let values: MediaValuesSimple = {};
    if (metadata) {
      values = {
        'regen:previewPhoto': metadata['regen:previewPhoto'],
        'regen:galleryPhotos': metadata['regen:galleryPhotos'],
        'regen:videoURL': metadata['regen:videoURL'],
        'schema:creditText': metadata['schema:creditText'],
      };
    }

    return values;
  }

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
    >
      <MediaForm
        submit={metadataSubmit}
        // graphData={graphData}
        initialValues={getInitialFormValues()}
        onNext={navigateNext}
        onPrev={navigatePrev}
        projectId={offChainProject?.id}
      />
    </ProjectFormTemplate>
  );
};

export { Media };
