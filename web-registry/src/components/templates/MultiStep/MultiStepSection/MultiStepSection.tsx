import React from 'react';

import { MultiStepProvider, ProviderProps } from '../context/MultiStepContext';
import StepperSection from './StepperSection';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
};

export default function MultiStepSection<T extends object>({
  formId,
  steps,
  initialData,
  children,
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider formId={formId} steps={steps} initialData={initialData}>
      <StepperSection>{children}</StepperSection>
    </MultiStepProvider>
  );
}
