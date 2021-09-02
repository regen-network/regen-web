import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Description from 'web-components/lib/components/description';
import { OnboardingFormTemplate } from '../components/templates';
import { EntityDisplayForm, EntityDisplayValues } from '../components/organisms';
import { useProjectByIdQuery, useUpdateProjectByIdMutation } from '../generated/graphql';

const exampleProjectUrl = '/projects/wilmot';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
}));

const EntityDisplay: React.FC = () => {
  const styles = useStyles();
  const activeStep = 0;
  const { projectId } = useParams();

  const [updateProject] = useUpdateProjectByIdMutation();
  // const { data } = useProjectByIdQuery({
  //   variables: { id: projectId },
  // }); TODO delete mock data below

  // TODO: use real data above after UI feedback
  const data = {
    projectById: {
      metadata: {
        'http://regen.network/landOwner': {
          '@type': 'http://regen.network/Organization',
          'http://regen.network/EntityDisplayShape-showOnProjectPage': false,
          legalName: 'Wyelba',
          name: '',
          logo: '',
          description: '',
        },
        'http://regen.network/landSteward': {
          '@type': 'http://regen.network/Individual',
          'http://regen.network/EntityDisplayShape-showOnProjectPage': false,
          name: 'Joe Doe',
          photo: '',
          description: '',
        },
        'http://regen.network/projectDeveloper': {
          '@type': 'http://regen.network/Individual',
          'http://regen.network/EntityDisplayShape-showOnProjectPage': false,
          name: 'Jane Goodall',
          photo: '',
          description: '',
        },
        'http://regen.network/projectOriginator': {
          '@type': 'http://regen.network/Organization',
          'http://regen.network/EntityDisplayShape-showOnProjectPage': false,
          legalName: 'Mad Ag',
          logo: '',
          description: '',
        },
      },
    },
  };

  let initialFieldValues: EntityDisplayValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;

    initialFieldValues = {
      'http://regen.network/landOwner': metadata['http://regen.network/landOwner'],
      'http://regen.network/landSteward': metadata['http://regen.network/landSteward'],
      'http://regen.network/projectDeveloper': metadata['http://regen.network/projectDeveloper'],
      'http://regen.network/projectOriginator': metadata['http://regen.network/projectOriginator'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: EntityDisplayValues): Promise<void> {
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
      // console.error(e);
    }
  }

  return (
    <OnboardingFormTemplate activeStep={activeStep} title="Entity Display" saveAndExit={saveAndExit}>
      <Description className={styles.description}>
        See an example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <EntityDisplayForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { EntityDisplay };
