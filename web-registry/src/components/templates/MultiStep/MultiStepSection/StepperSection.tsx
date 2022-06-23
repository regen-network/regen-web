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
  const { steps, activeStep, resultStatus } = useMultiStep();

  function getResultTitle(
    resultStatus: 'success' | 'error',
  ): string | undefined {
    return steps?.[activeStep].resultTitle?.[resultStatus];
  }

  let title = '';
  if (resultStatus) title = getResultTitle(resultStatus) || '';
  if (steps && !resultStatus) title = steps[activeStep].title || '';

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
      <OnBoardingSection title={title} formContainer>
        <Box minHeight="50vh">
          {children}
          {/* TODO ? - <StepperControls /> (with saveFooter)  */}
        </Box>
      </OnBoardingSection>
    </>
  );
}
