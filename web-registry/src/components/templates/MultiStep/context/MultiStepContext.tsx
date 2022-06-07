import React from 'react';

// TODO - persistence: localstorage / db
// TODO - evaluate initial state from initial data (already persisted?)

/**
 *
 * Multi-step form context
 *
 */

type Step = {
  id: string;
  name: string;
  title: string;
  percentage?: number;
};

type ContextProps<T extends object> = {
  steps: Step[] | undefined;
  data: T;
  // saveData: Dispatch<T>;
  activeStep: number;
  isLastStep: boolean;
  isReviewStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleSave: (_data: T) => void;
  handleSaveNext: (_data: T) => void;
};

const initialValues = {
  steps: undefined,
  data: {},
  // saveData: () => {},
  activeStep: 0,
  isLastStep: false,
  isReviewStep: false,
  handleNext: () => {},
  handleBack: () => {},
  handleSave: () => {},
  handleSaveNext: () => {},
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
  const { activeStep, isLastStep, isReviewStep, goNext, goBack } = useSteps(
    steps.length,
  );

  const handleNext = (): void => {
    // check
    goNext();
  };

  const handleBack = (): void => {
    // check
    goBack();
  };

  const handleSave = (_data: T | {}): void => {
    // check
    saveData(_data);
  };

  const handleSaveNext = (_data: T | {}): void => {
    // check
    handleNext();
    handleSave(_data);
  };

  const value = {
    steps,
    data,
    saveData,
    activeStep,
    isLastStep,
    isReviewStep,
    handleNext,
    handleBack,
    handleSave,
    handleSaveNext,
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
  goNext: () => void;
  goBack: () => void;
};

function useSteps(numSteps: number): StepManagement {
  const [activeStep, setActiveStep] = React.useState(0);
  const isLastStep = activeStep === numSteps - 1;
  const isReviewStep = activeStep === numSteps - 2;

  const goNext = (): void => {
    if (isLastStep) return;
    setActiveStep(prev => prev + 1);
  };
  const goBack = (): void => {
    if (activeStep === 0) return;
    setActiveStep(prev => prev - 1);
  };

  return {
    activeStep,
    isLastStep,
    isReviewStep,
    goNext,
    goBack,
  };
}
