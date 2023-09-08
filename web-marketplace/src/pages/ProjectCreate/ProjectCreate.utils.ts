import {
  PROJECT_CREATION_STEPS,
  PROJECT_STEPS_COUNT,
} from './ProjectCreate.constants';

type GetProjectCreationPercentageParams = {
  currentStep: string;
};

export const getProjectCreationPercentage = ({
  currentStep,
}: GetProjectCreationPercentageParams) => {
  const currentIndex = PROJECT_CREATION_STEPS.findIndex(
    step => step === currentStep,
  );
  const percentage = ((currentIndex + 1) / PROJECT_STEPS_COUNT) * 100;

  return percentage;
};
