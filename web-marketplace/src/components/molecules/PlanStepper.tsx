import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Stepper from 'web-components/src/components/stepper';

import background from '../../assets/topography-pattern-full-1.png';

interface PlanStepperProps {
  activeStep: number;
}

const steps = [msg`Create Project`, msg`Review`, msg`Finished`];

const PlanStepper: React.FC<React.PropsWithChildren<PlanStepperProps>> = ({
  activeStep,
}) => {
  const { _ } = useLingui();
  const translatedSteps = steps.map(step => _(step));

  return (
    <Stepper
      sx={{ mw: 240 }}
      activeStep={activeStep}
      steps={translatedSteps}
      background={background}
    />
  );
};

export { PlanStepper };
