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

type ProjectAccountSelection = {
  address?: string;
  isOrganization: boolean;
};

type ProjectAccountSelections = Record<string, ProjectAccountSelection>;

type PendingProjectIds = Record<string, string | null>;

export const projectsCurrentStepAtom = atomWithStorage(
  'projectsCurrentStep',
  {} as ProjectsCurrentStep,
);

export const projectsDraftState = atom<ProjectsDraftStatus>([]);

export const projectAccountSelectionsAtom =
  atomWithStorage<ProjectAccountSelections>('projectAccountSelections', {});

export const pendingProjectIdsAtom = atomWithStorage<PendingProjectIds>(
  'pendingProjectIds',
  {},
);
