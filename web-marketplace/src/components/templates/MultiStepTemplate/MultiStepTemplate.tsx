import { OnBoardingSectionProps } from 'web-components/src/components/section/OnBoardingSection';

import { MultiStepProvider, ProviderProps } from './MultiStep.context';
import { StepperSection } from './StepperSection';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
} & Pick<OnBoardingSectionProps, 'classes'>;

export function MultiStepTemplate<T extends object>({
  formId,
  steps,
  initialValues,
  children,
  withLocalStorage,
  classes,
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider
      formId={formId}
      steps={steps}
      initialValues={initialValues}
      withLocalStorage={withLocalStorage}
    >
      <StepperSection classes={classes}>{children}</StepperSection>
    </MultiStepProvider>
  );
}
