import React from 'react';

import Stepper from 'web-components/lib/components/stepper';

import background from '../../assets/topography-pattern-full-1.png';

interface PlanStepperProps {
  activeStep: number;
}

const steps = ['Create Project', 'Review', 'Finished'];

const PlanStepper: React.FC<PlanStepperProps> = ({ activeStep }) => {
  return (
    <Stepper
      sx={{ mw: 240 }}
      activeStep={activeStep}
      steps={steps}
      background={background}
    />
  );
};

export { PlanStepper };
