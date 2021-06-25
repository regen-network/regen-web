import React from 'react';

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
      >
        {props.children}
      </OnBoardingSection>
    </>
  );
};

export { OnboardingFormTemplate };
