import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { useLocalStorage } from 'hooks';

// TODO - persistence alternatives: component / localstorage / db
// Instead of directly using the local storage hook here, we should use an
// abstraction related to persistence (useStorage or usePersistence), to hide final implementation
//    * useStorage(storageType: 'ui' | 'browser' | 'session' | 'server' )

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
};

type ContextProps<T extends object> = {
  steps: Step[] | undefined;
  data: T;
  maxAllowedStep: number;
  dataDisplay?: any;
  activeStep: number;
  isLastStep: boolean;
  isReviewStep: boolean;
  percentComplete: number;
  handleActiveStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleSaveNext: (formValues: T, dataDisplay?: any) => void;
  handleResetReview: () => void;
  handleSuccess: () => void;
  handleError: () => void;
  resultStatus: ResultStatus;
};

const initialValues = {
  steps: undefined,
  data: {},
  maxAllowedStep: 0,
  activeStep: 0,
  isLastStep: false,
  isReviewStep: false,
  percentComplete: 0,
  resultStatus: undefined,
  handleActiveStep: () => {},
  handleNext: () => {},
  handleBack: () => {},
  handleSaveNext: () => {},
  handleResetReview: () => {},
  handleSuccess: () => {},
  handleError: () => {},
};

const MultiStepContext = React.createContext<ContextProps<{}>>(initialValues);

/**
 *
 * Context provider wrapper, prepared with custom logic
 *
 */

type ResultStatus = 'success' | 'error' | undefined;

type FormData<T> = {
  formValues: T;
  dataDisplay?: any; // optional, complementary data to display in review step (ie. projectName, because value field is projectId)
  maxAllowedStep: number;
};

export type ProviderProps<T extends object> = {
  formId: string;
  initialValues: T;
  steps: Step[];
  children?: JSX.Element | JSX.Element[];
};

export function MultiStepProvider<T extends object>({
  formId,
  initialValues,
  steps,
  children,
}: React.PropsWithChildren<ProviderProps<T>>): JSX.Element {
  // we don't pass initialValues to localStorage
  // to avoid persist the initial empty data structure.
  // So initially, data (from storage) is `undefined` or
  // previously persisted data.
  // If undefined, then we return the initialValues
  const { data, saveData, removeData } = useLocalStorage<FormData<T>>(formId);

  const maxAllowedStep = data?.maxAllowedStep || 0;

  const {
    activeStep,
    isLastStep,
    isReviewStep,
    percentComplete,
    handleActiveStep,
    goNext,
    goBack,
  } = useSteps(steps.length);

  const [resultStatus, setResultStatus] = React.useState<ResultStatus>();

  // initial step on mount
  React.useEffect(() => {
    if (data?.maxAllowedStep) {
      handleActiveStep(data?.maxAllowedStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = (): void => {
    goNext();
  };

  const handleBack = (): void => {
    goBack();
  };

  const handleSave = (
    formValues: T | {},
    nextStep: number,
    dataDisplay?: any,
  ): void => {
    let _data: FormData<T> = {
      formValues: formValues as T,
      maxAllowedStep: nextStep,
    };
    if (dataDisplay || data?.dataDisplay)
      _data.dataDisplay = dataDisplay || data?.dataDisplay;
    saveData(_data);
  };

  const handleSaveNext = (formValues: T | {}, dataDisplay?: any): void => {
    const nextStep = activeStep + 1;
    const maxAllowed = Math.max(nextStep, maxAllowedStep);
    handleSave(formValues, maxAllowed, dataDisplay);
    handleNext();
  };

  // this reset does not clean the stored data, it simply forces the form to start
  // from step 0 so that the form itself validates as the flow is carried out manually.
  const handleResetReview = (): void => {
    handleSave(data?.formValues || {}, 0, data?.dataDisplay);
    handleActiveStep(0);
  };

  const handleSuccess = (): void => {
    setResultStatus('success');
    handleNext();
    handleResetData();
  };

  // TODO - differentiate various types of errors
  const handleError = (): void => {
    setResultStatus('error');
    handleNext();
  };

  const handleResetData = (): void => {
    removeData();
  };

  const value: ContextProps<T | {}> = {
    steps,
    data: data?.formValues || initialValues,
    maxAllowedStep,
    dataDisplay: data?.dataDisplay,
    activeStep,
    isLastStep,
    isReviewStep,
    percentComplete,
    handleActiveStep,
    handleNext,
    handleBack,
    handleSaveNext,
    handleResetReview,
    handleSuccess,
    handleError,
    resultStatus,
  };

  return (
    <MultiStepContext.Provider value={value}>
      {children}
    </MultiStepContext.Provider>
  );
}

export function useMultiStep<T extends object>(): ContextProps<T> {
  const { _ } = useLingui();
  const context = React.useContext(MultiStepContext);

  if (context === undefined) {
    throw new Error(
      _(msg`useMultiStep must be used within a MultiStepProvider`),
    );
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
  percentComplete: number;
  handleActiveStep: (step: number) => void;
  goNext: () => void;
  goBack: () => void;
};

function calculatePercentComplete(
  numSteps: number,
  activeStep: number,
): number {
  return (activeStep * 100) / numSteps;
}

function useSteps(numSteps: number): StepManagement {
  const [activeStep, setActiveStep] = React.useState(0);

  // derived states from activeStep
  const isLastStep = activeStep === numSteps - 1;
  const isReviewStep = activeStep === numSteps - 2;
  const percentComplete = calculatePercentComplete(numSteps, activeStep + 1);

  const handleActiveStep = (step: number): void => {
    if (step > numSteps) return;
    if (step < 0) return;
    setActiveStep(step);
  };

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
    percentComplete,
    isLastStep,
    isReviewStep,
    handleActiveStep,
    goNext,
    goBack,
  };
}
