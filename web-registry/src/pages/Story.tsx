import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Description from 'web-components/lib/components/description';
import { PlanStepper } from '../components/molecules';
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

  const saveAndExit = (): void => {
    // TODO: functionality
  };

  const submit = (values: StoryValues): Promise<void> => {
    // TODO: functionality:
    return Promise.resolve();
  };

  return (
    <>
      <PlanStepper activeStep={activeStep} />
      <OnBoardingSection title="Story" linkText="Save & Exit" onLinkClick={saveAndExit} formContainer>
        <Description className={styles.description}>
          See an example{' '}
          <Link to={exampleProjectUrl} target="_blank">
            project page»
          </Link>
        </Description>
        <StoryForm submit={submit} exampleProjectUrl={exampleProjectUrl} />
      </OnBoardingSection>
    </>
  );
};

export { Story };
