import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Description from 'web-components/lib/components/description';
import { OnboardingFormTemplate } from '../components/templates';
import { MediaForm, MediaValues } from '../components/organisms';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';

const exampleProjectUrl = '/projects/wilmot';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
}));

const Media: React.FC = () => {
  const styles = useStyles();
  const activeStep = 0;
  const { projectId } = useParams();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: MediaValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://regen.network/previewPhoto': metadata['http://regen.network/previewPhoto'],
      'http://regen.network/galleryPhotos': metadata['http://regen.network/galleryPhotos'],
      'http://regen.network/landStewardPhoto': metadata['http://regen.network/landStewardPhoto'],
      'http://regen.network/videoURL': metadata['http://regen.network/videoURL'],
    };
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
      // TODO: go to next step
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return (
    <OnboardingFormTemplate activeStep={activeStep} title="Media" saveAndExit={saveAndExit}>
      <Description className={styles.description}>
        See an example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <MediaForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { Media };
