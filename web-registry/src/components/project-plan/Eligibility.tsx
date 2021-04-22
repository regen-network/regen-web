import React from 'react';

import PlanStepper from './PlanStepper';
import EligibilityForm, { Values } from './EligibilityForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

const Eligibility: React.FC = () => {
  const activeStep = 0;

  const saveAndExit = (): void => {
    // TODO: functionality
  };

  const submit = (values: Values): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  return (
    <>
      <PlanStepper activeStep={activeStep} />
      <OnBoardingSection title="Eligibility" linkText="Save & Exit" onLinkClick={saveAndExit} formContainer>
        <EligibilityForm submit={submit} />
      </OnBoardingSection>
    </>
  );
};

export default Eligibility;
