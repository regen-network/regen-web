import React from 'react';

import background from '../../assets/topography-pattern-full-1.png';
import Stepper from 'web-components/lib/components/stepper';

interface BatchStepperProps {
  activeStep: number;
}

const steps = ['Credit Basics', 'Recipient(s)', 'Review', 'Finished'];

const BatchStepper: React.FC<BatchStepperProps> = ({ activeStep }) => {
  return (
    <Stepper
      sx={{ mw: 240 }}
      activeStep={activeStep}
      steps={steps}
      background={background}
    />
  );
};

export { BatchStepper };
