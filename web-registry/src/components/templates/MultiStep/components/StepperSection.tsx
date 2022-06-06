import React from 'react';
import Box from '@mui/material/Box';

import Stepper from 'web-components/lib/components/stepper';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { useMultiStep } from '../context/MultiStepContext';

/**
 *
 * Stepper section
 *
 */

type StepperSectionProps = {
  children: JSX.Element | JSX.Element[];
  // children: React.ReactNode;
};

export default function StepperSection({
  children,
}: StepperSectionProps): JSX.Element {
  const { steps, activeStep } = useMultiStep();

  return (
    <>
      <Stepper
        sx={{ mw: 240 }}
        steps={steps ? steps.map(step => step.name) : []}
        activeStep={activeStep}
        // TODO
        onStepClick={() => {}}
        // onStepClick={(stepIndex: number) => setActiveStep(stepIndex)}
      />
      <OnBoardingSection
        title={steps ? steps[activeStep].title : ''}
        formContainer
      >
        <Box minHeight="50vh">{children}</Box>
      </OnBoardingSection>
    </>
  );
}
