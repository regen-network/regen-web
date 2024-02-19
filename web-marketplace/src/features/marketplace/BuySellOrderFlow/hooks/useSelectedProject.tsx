import { useEffect, useState } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';

type Props = {
  projects?: ProjectWithOrderData[] | null | undefined;
};

type ReponseType = {
  selectedProject: ProjectWithOrderData | undefined;
  setSelectedProject: UseStateSetter<ProjectWithOrderData | undefined>;
  setSelectedProjectById: (projectId: string) => void | undefined;
};

export const useSelectedProject = ({ projects }: Props): ReponseType => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData>();

  useEffect(() => {
    if (projects?.length === 1) setSelectedProject(projects[0]);
  }, [projects]);

  const setSelectedProjectById = (projectId: string): void | undefined => {
    if (!projects || projects.length <= 1) return;
    const found = projects.find(project => project.id === projectId);
    if (found) setSelectedProject(found);
  };

  return {
    selectedProject,
    setSelectedProject,
    setSelectedProjectById,
  };
};
