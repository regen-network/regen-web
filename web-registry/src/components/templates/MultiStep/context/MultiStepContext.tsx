import React, { Dispatch } from 'react';

/**
 *
 * Multi-step form context
 *
 */

type ContextProps<T extends object> = {
  steps: Step[] | undefined;
  data: T;
  saveData: Dispatch<T>;
  activeStep: number;
  isLastStep: boolean;
  isReviewStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
};

type Step = {
  id: string;
  name: string;
  title: string;
};

const initialValues = {
  steps: undefined,
  data: {},
  saveData: () => {},
  activeStep: 0,
  isLastStep: false,
  isReviewStep: false,
  handleNext: () => {},
  handleBack: () => {},
};

const MultiStepContext = React.createContext<ContextProps<{}>>(initialValues);

/**
 *
 * Context provider wrapper, prepared with custom logic
 *
 */

export type ProviderProps<T extends object> = {
  initialData: T;
  steps: Step[];
  children?: JSX.Element | JSX.Element[];
};

export function MultiStepProvider<T extends object>({
  initialData,
  steps,
  children,
}: React.PropsWithChildren<ProviderProps<T>>): JSX.Element {
  const [data, saveData] = React.useState<T | {}>(() => initialData);
  const { activeStep, isLastStep, isReviewStep, handleNext, handleBack } =
    useSteps(steps.length);

  const value = {
    steps,
    data,
    saveData,
    activeStep,
    isLastStep,
    isReviewStep,
    handleNext,
    handleBack,
  };

  return (
    <MultiStepContext.Provider value={value}>
      {children}
    </MultiStepContext.Provider>
  );
}

export function useMultiStep<T extends object>(): ContextProps<T> {
  const context = React.useContext(MultiStepContext);
  if (context === undefined) {
    throw new Error('useMultiStep must be used within a MultiStepProvider');
  }
  return context as unknown as ContextProps<T>;
}

/**
 *
 * Step management hook
 *
 */

type StepManagement = {
  activeStep: number;
  isLastStep: boolean;
  isReviewStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
};

function useSteps(numSteps: number): StepManagement {
  const [activeStep, setActiveStep] = React.useState(0);
  const isLastStep = activeStep === numSteps - 1;
  const isReviewStep = activeStep === numSteps - 2;

  const handleNext = (): void => setActiveStep(activeStep + 1);
  const handleBack = (): void => setActiveStep(activeStep - 1);

  return {
    activeStep,
    isLastStep,
    isReviewStep,
    handleNext,
    handleBack,
  };
}
