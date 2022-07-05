import React from 'react';
import { useParams } from 'react-router-dom';

import {
  getURLInitialValue,
  getURLListInitialValue,
} from 'web-components/lib/utils/schemaURL';
import { Loading } from 'web-components/lib/components/loading';

import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../../components/templates';
import {
  MediaForm,
  MediaValues,
  isSimpleMediaFormValues,
} from '../../components/organisms/MediaForm';
import {
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { getProjectShapeIri } from '../../lib/rdf';
import { useProjectEditContext } from '../ProjectEdit';

<<<<<<< HEAD
const Media: React.FC = () => {
=======
const PHOTO_COUNT = 4;

const Media = (): JSX.Element => {
>>>>>>> 8fd95f26 (feat: create simplified media form (#990))
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isEdit } = useProjectEditContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { data: projectData, loading: loadingProject } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
<<<<<<< HEAD

  let initialFieldValues: MediaValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'regen:previewPhoto': metadata['regen:previewPhoto'],
      'regen:galleryPhotos': metadata['regen:galleryPhotos'],
      'regen:landStewardPhoto': metadata['regen:landStewardPhoto'],
      'regen:videoURL': metadata['regen:videoURL'],
    };
=======
  const project = projectData?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;

  const { data: graphData } = useShaclGraphByUriQuery({
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  function getInitialFormValues(): MediaValues {
    let values: MediaValues = {};
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
      values['regen:creditText'] = metadata['regen:creditText'] || '';
    } else {
      values['regen:landStewardPhoto'] = getURLInitialValue(
        metadata['regen:landStewardPhoto'],
      );
    }
    return values;
>>>>>>> 8fd95f26 (feat: create simplified media form (#990))
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: MediaValues): Promise<void> {
    const metadata = { ...data?.projectById?.metadata, ...values };
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
    } catch (e) {
      console.error('error saving media form', e); // eslint-disable-line no-console
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

<<<<<<< HEAD
=======
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

>>>>>>> 8fd95f26 (feat: create simplified media form (#990))
  return isEdit ? (
    <EditFormTemplate>
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Media"
      saveAndExit={saveAndExit}
    >
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { Media };
