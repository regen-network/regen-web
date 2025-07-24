import React, { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import Image from 'next/image';

import Stepper from 'web-components/src/components/stepper';

import { TranslatorType } from 'lib/i18n/i18n.types';

import background from '../../../public/png/topography-pattern-full-1.png';

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
    <div className="relative">
      <Image alt={_(msg`background`)} src={background.src} fill sizes="100vw" />
      <Stepper sx={{ mw: 240 }} activeStep={activeStep} steps={steps} />
    </div>
  );
};

export { PlanStepper };
