import React from 'react';
import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { PlanStepper } from '../molecules';

type Props = {
  title: string;
  saveAndExit: () => Promise<void>;
  activeStep: number;
};

const OnboardingFormTemplate: React.FC<Props> = props => {
  return (
    <>
      <PlanStepper activeStep={props.activeStep} />
      <OnBoardingSection
        title={props.title}
        linkText="Save & Exit"
        onLinkClick={props.saveAndExit}
        formContainer
        exampleProjectUrl="/projects/wilmot"
      >
        <Box minHeight="50vh">{props.children}</Box>
      </OnBoardingSection>
    </>
  );
};

export { OnboardingFormTemplate };
