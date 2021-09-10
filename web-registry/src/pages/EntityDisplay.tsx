import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Description from 'web-components/lib/components/description';
import { OnboardingFormTemplate } from '../components/templates';
import { EntityDisplayForm, EntityDisplayValues, ProjectEntityType } from '../components/organisms';
import {
  // useProjectByIdQuery, TODO
  useUpdateProjectByIdMutation,
} from '../generated/graphql';

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
          '@type': 'http://regen.network/Organization' as ProjectEntityType,
          'http://regen.network/showOnProjectPage': false,
          'http://schema.org/legalName': 'Wyelba',
          'http://schema.org/name': '',
          'http://schema.org/logo': '',
          'http://schema.org/description': '',
        },
        'http://regen.network/landSteward': {
          '@type': 'http://regen.network/Individual' as ProjectEntityType,
          'http://regen.network/showOnProjectPage': false,
          'http://schema.org/name': 'Joe Doe',
          'http://schema.org/photo': '',
          'http://schema.org/description': '',
        },
        'http://regen.network/projectDeveloper': {
          '@type': 'http://regen.network/Individual' as ProjectEntityType,
          'http://regen.network/showOnProjectPage': false,
          'http://schema.org/name': 'Jane Goodall',
          'http://schema.org/photo': '',
          'http://schema.org/description': '',
        },
        'http://regen.network/projectOriginator': {
          '@type': 'http://regen.network/Organization' as ProjectEntityType,
          'http://regen.network/showOnProjectPage': false,
          'http://schema.org/legalName': 'Mad Ag',
          'http://schema.org/logo': '',
          'http://schema.org/description': '',
        },
      },
    },
  };

  let initialFieldValues: EntityDisplayValues = {};
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
