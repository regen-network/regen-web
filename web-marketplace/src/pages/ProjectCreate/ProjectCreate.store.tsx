import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type ProjectsCurrentStep = {
  [id: string]: string;
};
type ProjectDraftStatus = {
  id: string;
  draft: boolean | undefined;
};
export type ProjectsDraftStatus = ProjectDraftStatus[] | [];

export const projectsCurrentStepAtom = atomWithStorage(
  'projectsCurrentStep',
  {} as ProjectsCurrentStep,
);

export const projectsDraftState = atom<ProjectsDraftStatus>([]);
