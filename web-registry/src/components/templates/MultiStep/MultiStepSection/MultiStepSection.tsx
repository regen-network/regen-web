import React from 'react';

import { MultiStepProvider, ProviderProps } from '../context/MultiStepContext';
import StepperSection from './StepperSection';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
};

export default function MultiStepSection<T extends object>({
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
