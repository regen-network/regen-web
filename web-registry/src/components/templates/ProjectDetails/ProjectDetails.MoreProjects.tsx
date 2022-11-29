import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';

import useMoreProjects from './hooks/useMoreProjects';

export function MoreProjects(): JSX.Element {
  const { projectId } = useParams();
  const projects = useMoreProjects(projectId as string);

  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  return (
    <Box className="topo-background-alternate" sx={{ pb: 9 }}>
      <ProjectCardsSection
        title="More Projects"
        projects={projects}
        onButtonClick={({ project }) => {
          setSelectedProject(project);
          setIsBuyFlowStarted(true);
        }}
      />
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={selectedProject && [selectedProject]}
      />
    </Box>
  );
}

export const MemoizedMoreProjects = React.memo(MoreProjects);
