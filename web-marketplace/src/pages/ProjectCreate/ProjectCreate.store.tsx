import { atomWithStorage } from 'jotai/utils';

type ProjectsCurrentStep = {
  [id: string]: string;
};

export const projectsCurrentStepAtom = atomWithStorage(
  'projectsCurrentStep',
  {} as ProjectsCurrentStep,
);
