import React from 'react';

import { MultiStepProvider, ProviderProps } from '../context/MultiStepContext';
import StepperSection from './StepperSection';

type MultiStepProps<T extends Record<string, unknown>> = ProviderProps<T> & {
  children: JSX.Element;
};

export default function MultiStepSection<T extends Record<string, unknown>>({
  formId,
  steps,
  initialValues,
  children,
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider
      formId={formId}
      steps={steps}
      initialValues={initialValues}
    >
      <StepperSection>{children}</StepperSection>
    </MultiStepProvider>
  );
}
