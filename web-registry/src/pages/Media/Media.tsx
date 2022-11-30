import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from 'web-components/lib/components/loading';

import {
  getProjectShapeIri,
  getURLInitialValue,
  getURLListInitialValue,
} from 'lib/rdf';

import {
  isSimpleMediaFormValues,
  MediaForm,
  MediaValues,
} from '../../components/organisms/MediaForm';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import {
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const PHOTO_COUNT = 4;

const Media = (): JSX.Element => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isEdit } = useProjectEditContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { data: projectData, loading: loadingProject } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = projectData?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;

  const { data: graphData } = useShaclGraphByUriQuery({
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  function getInitialFormValues(): MediaValues {
    const values: MediaValues = {};
    const metadata = project?.metadata || {};
    values['regen:previewPhoto'] = getURLInitialValue(
      metadata['regen:previewPhoto'],
    );
    values['regen:galleryPhotos'] = getURLListInitialValue(
      PHOTO_COUNT,
      metadata['regen:galleryPhotos'],
    );
    values['regen:videoURL'] = getURLInitialValue(metadata['regen:videoURL']);

    if (isSimpleMediaFormValues(values, creditClassId)) {
      values['schema:creditText'] = metadata['schema:creditText'] || '';
    } else {
      values['regen:landStewardPhoto'] = getURLInitialValue(
        metadata['regen:landStewardPhoto'],
      );
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
    const prevStep = creditClassId ? 'story' : 'description';
    navigate(`/project-pages/${projectId}/${prevStep}`);
  }

  async function submit(values: MediaValues): Promise<void> {
    const metadata = { ...project?.metadata, ...values };
    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              metadata,
            },
          },
        },
      });
      if (!isEdit) navigateNext();
    } catch (e) {
      console.error('error saving media form', e); // eslint-disable-line no-console
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  const Form = (): JSX.Element => (
    <MediaForm
      submit={submit}
      creditClassId={creditClassId}
      graphData={graphData}
      initialValues={getInitialFormValues()}
      onNext={navigateNext}
      onPrev={navigatePrev}
    />
  );

  if (loadingProject) return <Loading />;

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Media"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { Media };
