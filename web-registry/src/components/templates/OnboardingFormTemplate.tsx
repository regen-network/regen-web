import React from 'react';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { PlanStepper } from '../molecules';

type Props = {
  title: string;
  saveAndExit: () => Promise<void>;
  activeStep: number;
  submit: (values?: any) => Promise<void>;
  goBack?: () => void;
  goForward?: () => void;
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
      <OnboardingFooter
        onSave={props.submit}
        saveText={'Save and Next'}
        onPrev={props.goBack} // TODO
        onNext={props.goForward} // TODO
        hideProgress={false} // TODO
        saveDisabled={false}
        percentComplete={0} // TODO
      />
    </>
  );
};

export { OnboardingFormTemplate };
