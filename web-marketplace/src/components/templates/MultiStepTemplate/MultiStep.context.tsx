import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { useStorage } from 'hooks';

import { useBrowserNavDirection } from './hooks/useBrowserNavDirection';

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
  description?: string;
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
  handleSave: (formValues: T | {}, nextStep: number, dataDisplay?: any) => void;
  handleSaveNext: (formValues: T, dataDisplay?: any) => void;
  handleResetReview: () => void;
  handleSuccess: () => void;
  handleError: () => void;
  handleResetData: () => void;
  resultStatus: ResultStatus;
};

export type HandleSaveType<T extends object> = ContextProps<T>['handleSave'];

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
  handleSave: () => {},
  handleSaveNext: () => {},
  handleResetReview: () => {},
  handleSuccess: () => {},
  handleError: () => {},
  handleResetData: () => {},
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
  withLocalStorage?: boolean;
  forceStep?: number;
};

export function MultiStepProvider<T extends object>({
  formId,
  initialValues,
  steps,
  children,
  withLocalStorage = true,
  forceStep,
}: React.PropsWithChildren<ProviderProps<T>>): JSX.Element | null {
  // we don't pass initialValues to localStorage
  // to avoid persist the initial empty data structure.
  // So initially, data (from storage) is `undefined` or
  // previously persisted data.
  // If undefined, then we return the initialValues
  const { data, saveData, removeData, isLoading } = useStorage<FormData<T>>(
    formId,
    withLocalStorage,
  );

  const maxAllowedStep = forceStep || data?.maxAllowedStep || 0;

  const {
    activeStep,
    isLastStep,
    isReviewStep,
    percentComplete,
    handleActiveStep,
    goNext,
    goBack,
  } = useSteps(steps, maxAllowedStep);

  const [resultStatus, setResultStatus] = React.useState<ResultStatus>();

  const handleNext = (): void => {
    goNext();
  };

  const handleBack = (): void => {
    goBack();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    handleSave,
    handleSaveNext,
    handleResetReview,
    handleSuccess,
    handleError,
    handleResetData,
    resultStatus,
  };

  // Wait to check local storage before rendering component
  if (isLoading) {
    return null;
  }

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

function useSteps(steps: Step[], startStep?: number): StepManagement {
  const numSteps = steps.length;
  const [activeStep, setActiveStep] = React.useState(startStep || 0);
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);
  const lastStepFromUrl = useRef<number | null>(null);

  // derived states from activeStep
  const isLastStep = activeStep === numSteps - 1;
  const isReviewStep = activeStep === numSteps - 2;
  const percentComplete = calculatePercentComplete(numSteps, activeStep + 1);

  const handleActiveStep = (step: number): void => {
    if (step > numSteps || step < 0) return;
    setActiveStep(step);
  };

  const goNext = useCallback((): void => {
    if (isLastStep) return;
    setActiveStep(prev => prev + 1);
  }, [isLastStep]);

  const goBack = useCallback((): void => {
    if (activeStep === 0) return;
    setActiveStep(prev => prev - 1);
  }, [activeStep]);

  const getBasePath = useCallback(() => {
    const path = location.pathname;

    // Check if the current path contains any step ID and removes it if found
    // to allow direct navigation to the different steps.
    const stepMatch = steps.find(step => path.endsWith(`/${step.id}`));
    if (stepMatch) {
      return path.replace(new RegExp(`(/${stepMatch.id})$`), '');
    }

    return path;
  }, [location.pathname, steps]);

  const getStepPath = useCallback(
    (stepIndex: number): string => {
      const step = steps[stepIndex];
      const path = getBasePath();

      // Check if the current path already includes the step ID
      if (step?.id && location.pathname.endsWith(`/${step.id}`)) {
        return location.pathname;
      }

      // Append the step ID or step index to the base path
      return `${path}/${step.id}`;
    },
    [steps, getBasePath, location.pathname],
  );

  // On mount, force‑redirect to initialStep
  useLayoutEffect(() => {
    if (!hasInitialized.current && startStep !== undefined) {
      const path = getStepPath(startStep);
      navigate(path, { replace: true });
      hasInitialized.current = true;
      lastStepFromUrl.current = startStep;
    }
  }, [startStep, navigate, getStepPath]);

  const { browserNavDirection, setBrowserNavDirection } =
    useBrowserNavDirection();

  // Sync state => URL on internal navigation
  const pathToNavigate = useMemo(() => {
    if (activeStep !== undefined) {
      return getStepPath(activeStep);
    }
    return null;
  }, [activeStep, getStepPath]);

  useLayoutEffect(() => {
    if (browserNavDirection.back || browserNavDirection.forward) {
      // mark as handled so next UI nav still works
      lastStepFromUrl.current = activeStep;
      return;
    }

    if (
      lastStepFromUrl.current !== activeStep &&
      activeStep !== undefined &&
      pathToNavigate
    ) {
      navigate(pathToNavigate, { replace: false });
      lastStepFromUrl.current = activeStep;
    }
  }, [
    navigate,
    activeStep,
    pathToNavigate,
    browserNavDirection.back,
    browserNavDirection.forward,
  ]);

  useEffect(() => {
    if (browserNavDirection.back) {
      goBack();
      setBrowserNavDirection({ back: false, forward: false });
    }
    if (browserNavDirection.forward) {
      goNext();
      setBrowserNavDirection({ back: false, forward: false });
    }
  }, [goBack, goNext, browserNavDirection, setBrowserNavDirection]);

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
