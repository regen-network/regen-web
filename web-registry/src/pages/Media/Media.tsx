import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from 'web-components/lib/components/loading';

import { getURLInitialValue, getURLListInitialValue } from 'lib/rdf';

import { ProjectFormTemplate } from 'components/templates/ProjectFormTemplate';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import {
  MediaForm,
  MediaValues,
  MediaValuesSimple,
} from '../../components/organisms/MediaForm';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const PHOTO_COUNT = 4;

const Media = (): JSX.Element => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit, onChainProject } = useProjectEditContext();
  const { metadata, offChainProject } = useProjectWithMetadata({
    projectId,
    isEdit,
    onChainProject,
    unanchored: true,
  });

  const [updateProject] = useUpdateProjectByIdMutation();

  // TODO validation regen-registry/issues/1501
  // Get ProjectPage SHACL graph (to validate unanchored data)
  // const { data: graphData } = useShaclGraphByUriQuery({
  //   variables: {
  //     uri: getProjectPageShapeIri(),
  //   },
  // });

  function getInitialFormValues(): MediaValuesSimple {
    const values: MediaValuesSimple = {};
    if (metadata) {
      values['regen:previewPhoto'] = getURLInitialValue(
        metadata['regen:previewPhoto'],
      );
      values['regen:galleryPhotos'] = getURLListInitialValue(
        PHOTO_COUNT,
        metadata['regen:galleryPhotos'],
      );
      values['regen:videoURL'] = getURLInitialValue(metadata['regen:videoURL']);
      values['schema:creditText'] = metadata['schema:creditText'] || '';
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

  async function submit(values: MediaValues): Promise<void> {
    try {
      await updateProject({
        variables: {
          input: {
            id: offChainProject?.id,
            projectPatch: {
              metadata: { ...metadata, ...values },
            },
          },
        },
      });
      if (!isEdit) navigateNext();
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return (
    <ProjectFormTemplate
      isEdit={isEdit}
      title="Media"
      saveAndExit={saveAndExit}
    >
      <MediaForm
        submit={submit}
        // graphData={graphData}
        initialValues={getInitialFormValues()}
        onNext={navigateNext}
        onPrev={navigatePrev}
      />
    </ProjectFormTemplate>
  );
};

export { Media };
