import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';

import OnBoardingSection, {
  OnBoardingSectionProps,
} from 'web-components/src/components/section/OnBoardingSection';
import Stepper from 'web-components/src/components/stepper';

import { useMultiStep } from './MultiStep.context';

/**
 *
 * Stepper section
 *
 */

type StepperSectionProps = {
  children: JSX.Element | JSX.Element[];
} & Pick<OnBoardingSectionProps, 'classes'>;

// TODO: this should maybe live in MultiStepTemplate.tsx
export function StepperSection({
  children,
  classes,
}: StepperSectionProps): JSX.Element {
  const { steps, activeStep, resultStatus } = useMultiStep();
  const { _ } = useLingui();

  function getResultTitle(
    resultStatus: 'success' | 'error',
  ): string | undefined {
    const successStep = steps?.[activeStep].resultTitle?.[resultStatus];
    const successMessage = successStep ? _(successStep) : '';
    return resultStatus === 'success' ? successMessage : undefined;
  }

  let title = '';
  if (resultStatus) title = getResultTitle(resultStatus) || '';
  if (steps && !resultStatus) {
    const stepTitle = steps[activeStep].title;
    title = stepTitle ? _(stepTitle) : '';
  }

  return (
    <>
      <Stepper
        sx={{ mw: 240 }}
        steps={steps ? steps.map(step => _(step.name)) : []}
        activeStep={activeStep}
        onStepClick={() => null}
      />
      <OnBoardingSection
        title={title}
        description={steps?.[activeStep].description}
        formContainer
        classes={{
          description: 'pt-10 sm:pt-20 text-sm sm:text-lg',
          ...classes,
        }}
      >
        <Box minHeight="50vh">{children}</Box>
      </OnBoardingSection>
    </>
  );
}
