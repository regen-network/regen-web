import React from 'react';

import ProjectPlanSection from 'web-components/lib/components/section/ProjectPlanSection';
import PlanStepper from './PlanStepper';
import BasicInfoForm, { Values } from './BasicInfoForm';

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
      <ProjectPlanSection title="Basic Info" linkText="Save & Exit" onLinkClick={saveAndExit}>
        <BasicInfoForm submit={submit} />
      </ProjectPlanSection>
    </>
  );
};

export default BasicInfo;
