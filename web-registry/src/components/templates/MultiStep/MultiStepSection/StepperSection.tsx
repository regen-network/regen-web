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
};

export default function StepperSection({
  children,
}: StepperSectionProps): JSX.Element {
  const { steps, activeStep, isLastStep } = useMultiStep();

  function getResultTitle(): string | undefined {
    // TODO: manage success/error
    // if (success)
    return steps?.[activeStep].resultTitle?.success;
    // if (error) return steps[activeStep].resultTitle?.error
  }

  // Because title for the Result step is special (success/error)..
  let title = '';
  if (steps) {
    title = !isLastStep
      ? steps[activeStep].title || ''
      : getResultTitle() || '';
  }

  return (
    <>
      <Stepper
        sx={{ mw: 240 }}
        steps={steps ? steps.map(step => step.name) : []}
        activeStep={activeStep}
        // TODO ?
        // onStepClick={(stepIndex: number) => setActiveStep(stepIndex)}
        onStepClick={() => {}}
      />
      <OnBoardingSection
        // title={steps ? steps[activeStep].title : ''}
        title={title}
        formContainer
      >
        <Box minHeight="50vh">
          {children}
          {/* TODO - <StepperControls /> (with saveFooter)  */}
        </Box>
      </OnBoardingSection>
    </>
  );
}
