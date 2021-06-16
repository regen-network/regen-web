import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Description from 'web-components/lib/components/description';
import { OnboardingFormTemplate } from '../components/templates';
import { StoryForm, StoryValues } from '../components/organisms';

const exampleProjectUrl = '/projects/wilmot';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
}));

const Story: React.FC = () => {
  const styles = useStyles();
  const activeStep = 0;

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  const submit = (values: StoryValues): Promise<void> => {
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
      // TODO: Uncomment when implemented media form
      // history.push(`/project-pages/${projectId}/media`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      console.log(e);
    }
  };

  return (
    <OnboardingFormTemplate activeStep={activeStep} title="Story" saveAndExit={saveAndExit}>
      <Description className={styles.description}>
        See an example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <StoryForm submit={submit} exampleProjectUrl={exampleProjectUrl} />
    </OnboardingFormTemplate>
  );
};

export { Story };
