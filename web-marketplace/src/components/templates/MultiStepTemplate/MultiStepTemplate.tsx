import { MultiStepProvider, ProviderProps } from './MultiStep.context';
import { StepperSection } from './StepperSection';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
};

export function MultiStepTemplate<T extends object>({
  formId,
  steps,
  initialValues,
  children,
  withLocalStorage,
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider
      formId={formId}
      steps={steps}
      initialValues={initialValues}
      withLocalStorage={withLocalStorage}
    >
      <StepperSection>{children}</StepperSection>
    </MultiStepProvider>
  );
}
