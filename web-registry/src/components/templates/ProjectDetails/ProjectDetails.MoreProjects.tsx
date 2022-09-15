import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';

import useMoreProjects from './hooks/useMoreProjects';

export function MoreProjects(): JSX.Element {
  const { projectId } = useParams();
  const projects = useMoreProjects(projectId as string);

  return (
    <Box className="topo-background-alternate" sx={{ pb: 9 }}>
      <ProjectCardsSection title="More Projects" projects={projects} />
    </Box>
  );
}

export const MemoizedMoreProjects = React.memo(MoreProjects);
