import React from 'react';

import PlanStepper from './PlanStepper';
import BasicInfoForm, { Values } from './BasicInfoForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

const BasicInfo: React.FC = () => {
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
      <OnBoardingSection title="Basic Info" linkText="Save & Exit" onLinkClick={saveAndExit} formContainer>
        <BasicInfoForm submit={submit} />
      </OnBoardingSection>
    </>
  );
};

export default BasicInfo;
