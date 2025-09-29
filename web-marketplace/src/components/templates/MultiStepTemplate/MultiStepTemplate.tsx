import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { OnBoardingSectionProps } from 'web-components/src/components/section/OnBoardingSection';

import { MultiStepProvider, ProviderProps } from './MultiStep.context';
import { StepperSection } from './StepperSection';

type MultiStepProps<T extends object> = ProviderProps<T> & {
  children: JSX.Element;
  forceStep?: number;
  closable?: boolean;
  onRequestClose?: () => void;
  closeAriaLabel?: string;
} & Pick<OnBoardingSectionProps, 'classes'>;

export function MultiStepTemplate<T extends object>({
  formId,
  steps,
  initialValues,
  children,
  withLocalStorage,
  classes,
  forceStep,
  closable = false,
  onRequestClose,
  closeAriaLabel = 'close',
}: MultiStepProps<T>): JSX.Element {
  return (
    <MultiStepProvider
      formId={formId}
      steps={steps}
      initialValues={initialValues}
      withLocalStorage={withLocalStorage}
      forceStep={forceStep}
    >
      <div className="relative">
        {closable && onRequestClose && (
          <button
            type="button"
            aria-label={closeAriaLabel}
            onClick={onRequestClose}
            className="absolute top-0 right-0 mt-10 mr-10 z-50 p-8 rounded-full border-none bg-transparent hover:bg-bc-neutral-200 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-24 h-24 text-bc-neutral-600" />
          </button>
        )}
        <StepperSection classes={classes}>{children}</StepperSection>
      </div>
    </MultiStepProvider>
  );
}
