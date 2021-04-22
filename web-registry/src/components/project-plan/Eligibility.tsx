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
    // TODO: functionality:
    // if includesGrasslands === true, next screen is 'Eligibility: Land Use History'
    // if includesGrasslands === false, next screen is 'Sorry, you are not eligible for this credit class.'
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
