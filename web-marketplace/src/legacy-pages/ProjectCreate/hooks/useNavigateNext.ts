import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import { projectsCurrentStepAtom } from 'legacy-pages/ProjectCreate/ProjectCreate.store';

type Params = {
  step: string;
  projectId?: string;
};

export const useNavigateNext = ({ step, projectId }: Params) => {
  const navigate = useNavigate();
  const [projectsCurrentStep, setProjectsCurrentStep] = useAtom(
    projectsCurrentStepAtom,
  );

  const navigateNext = useCallback(() => {
    if (projectId) {
      setProjectsCurrentStep({
        ...projectsCurrentStep,
        [projectId]: step,
      });
      navigate(`/project-pages/${projectId}/${step}`);
    }
  }, [navigate, projectId, projectsCurrentStep, setProjectsCurrentStep, step]);

  return { navigateNext };
};
