import React from 'react';
import StepperSection from './components/StepperSection';
import { MultiStepProvider, ProviderProps } from './context/MultiStepContext';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
};

export default function MultiStepSection<T extends object>({
  steps,
  initialData,
  children,
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider steps={steps} initialData={initialData}>
      <StepperSection>{children}</StepperSection>
    </MultiStepProvider>
  );
}
