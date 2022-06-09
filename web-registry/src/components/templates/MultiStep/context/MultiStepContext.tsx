import React, { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

// TODO - WIP - evaluate initial state from initial data (already persisted?)
// TODO - persistence alternatives: component / localstorage / db

/**
 *
 * Multi-step form context
 *
 */

type Step = {
  id: string;
  name: string;
  title?: string;
  resultTitle?: {
    success: string;
    error: string;
  };
  percentage?: number;
};

type ContextProps<T extends object> = {
  steps: Step[] | undefined;
  data: T;
  activeStep: number;
  isLastStep: boolean;
  isReviewStep: boolean;
  handleActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSave: (_data: T) => void;
  handleSaveNext: (_data: T) => void;
};

const initialValues = {
  steps: undefined,
  data: {},
  activeStep: 0,
  isLastStep: false,
  isReviewStep: false,
  handleActiveStep: () => {},
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
  formId: string;
  initialData: T;
  steps: Step[];
  children?: JSX.Element | JSX.Element[];
};

export function MultiStepProvider<T extends object>({
  formId,
  initialData,
  steps,
  children,
}: React.PropsWithChildren<ProviderProps<T>>): JSX.Element {
  const [data, saveData] = useLocalStorage<T>(formId, initialData);
  const {
    activeStep,
    setActiveStep,
    isLastStep,
    isReviewStep,
    goNext,
    goBack,
  } = useSteps(steps.length);

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
    saveData(_data as T);
  };

  const handleSaveNext = (_data: T | {}): void => {
    // check
    handleNext();
    handleSave(_data);
  };

  const handleActiveStep = (step: number): void => {
    if (step > steps.length) return;
    if (step < 0) return;
    setActiveStep(step);
  };

  const value: ContextProps<T | {}> = {
    steps,
    data,
    activeStep,
    isLastStep,
    isReviewStep,
    handleActiveStep,
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
  // const context = React.useContext<ContextProps<T>>(
  //   MultiStepContext as unknown as React.Context<ContextProps<T>>,
  // );

  if (context === undefined) {
    throw new Error('useMultiStep must be used within a MultiStepProvider');
  }

  return context as unknown as ContextProps<T>;
  // return context;
}

/**
 *
 * Step management hook
 *
 */

type StepManagement = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
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
    setActiveStep,
    isLastStep,
    isReviewStep,
    goNext,
    goBack,
  };
}
