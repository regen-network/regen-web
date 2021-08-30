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
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: EntityDisplayValues | undefined;
  if (data?.projectById?.metadata) {
    // const metadata = data.projectById.metadata;

    const metadata = {
      'regen:landOwner': {
        'regen:EntityDisplayShape-showOnProjectPage': false,
        legalName: 'WYELBA test',
        name: '',
        logo: '',
        description: '',
      },
    };

    initialFieldValues = {
      'regen:landOwner': metadata['regen:landOwner'],
      // 'regen:landSteward': metadata['regen:landSteward'],
      // 'regen:projectDeveloper': metadata['regen:projectDeveloper'],
      // 'regen:projectOriginator': metadata['regen:projectOriginator'],
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
      // console.log(e);
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
