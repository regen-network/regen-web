import React from 'react';
import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { PlanStepper } from '../molecules';

type Props = {
  title: string;
  activeStep: number;
  saveAndExit?: () => Promise<void>;
};

const OnboardingFormTemplate: React.FC<Props> = props => {
  return (
    <>
      <PlanStepper activeStep={props.activeStep} />
      <OnBoardingSection
        title={props.title}
        formContainer
        // Only commenting this for now if at some point,
        // we want to add back the "save & exit" feature
        // https://github.com/regen-network/regen-registry/issues/553
        // linkText="Save & Exit"
        // onLinkClick={props.saveAndExit}
        // exampleProjectUrl="/projects/wilmot"
      >
        <Box minHeight="50vh">{props.children}</Box>
      </OnBoardingSection>
    </>
  );
};

export { OnboardingFormTemplate };
