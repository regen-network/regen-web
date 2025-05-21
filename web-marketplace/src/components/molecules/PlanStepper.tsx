import React, { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import Stepper from 'web-components/src/components/stepper';

import { TranslatorType } from 'lib/i18n/i18n.types';

import background from '../../assets/topography-pattern-full-1.png';

interface PlanStepperProps {
  activeStep: number;
}

const getSteps = (_: TranslatorType) => [
  _(msg`Create Project`),
  _(msg`Review`),
  _(msg`Finished`),
];

const PlanStepper: React.FC<React.PropsWithChildren<PlanStepperProps>> = ({
  activeStep,
}) => {
  const { _ } = useLingui();
  const steps = useMemo(() => getSteps(_), [_]);

  return (
    <Stepper
      sx={{ mw: 240 }}
      activeStep={activeStep}
      steps={steps}
      background={background.src}
    />
  );
};

export { PlanStepper };
