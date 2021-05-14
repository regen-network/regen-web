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

const OnboardingFormTemplate: React.FC<Props> = p => {
  return (
    <>
      <PlanStepper activeStep={p.activeStep} />
      <OnBoardingSection title={p.title} linkText="Save & Exit" onLinkClick={p.saveAndExit} formContainer>
        {p.children}
      </OnBoardingSection>
      <OnboardingFooter
        onSave={p.submit}
        saveText={'Save and Next'}
        onPrev={p.goBack} // TODO
        onNext={p.goForward} // TODO
        hideProgress={false} // TODO
        saveDisabled={false}
        percentComplete={0} // TODO
      />
    </>
  );
};

export { OnboardingFormTemplate };
