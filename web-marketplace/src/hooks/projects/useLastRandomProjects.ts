import { useRef } from 'react';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';

type Props = {
  random: boolean;
  selectedProjects: ProjectInfo[];
};

export const useLastRandomProjects = ({
  random,
  selectedProjects,
}: Props): ProjectInfo[] | undefined => {
  const lastRandomProjectsRef = useRef<ProjectInfo[] | undefined>();

  if (
    random &&
    selectedProjects?.length > 0 &&
    !lastRandomProjectsRef.current
  ) {
    lastRandomProjectsRef.current = selectedProjects;
  }

  return lastRandomProjectsRef.current;
};
