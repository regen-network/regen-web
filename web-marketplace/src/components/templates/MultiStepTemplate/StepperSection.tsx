import Box from '@mui/material/Box';

import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import Stepper from 'web-components/src/components/stepper';

import { useMultiStep } from './MultiStep.context';

/**
 *
 * Stepper section
 *
 */

type StepperSectionProps = {
  children: JSX.Element | JSX.Element[];
};

// TODO: this should maybe live in MultiStepTemplate.tsx
export function StepperSection({ children }: StepperSectionProps): JSX.Element {
  const { steps, activeStep, resultStatus } = useMultiStep();

  function getResultTitle(
    resultStatus: 'success' | 'error',
  ): string | undefined {
    return resultStatus === 'success'
      ? steps?.[activeStep].resultTitle?.[resultStatus]
      : undefined;
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
        onStepClick={() => null}
      />
      <OnBoardingSection title={title} formContainer>
        <Box minHeight="50vh">{children}</Box>
      </OnBoardingSection>
    </>
  );
}
