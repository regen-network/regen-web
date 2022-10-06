import React, { useState } from 'react';
import Box from '@mui/material/Box';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

interface Props {
  classId: string;
}

function ProjectsSection({ classId }: Props): JSX.Element {
  const { projectsWithOrderData } = useProjectsWithOrders({
    classId,
  });

  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  return (
    <Box className="topo-background-alternate" sx={{ pb: 9 }}>
      <ProjectCardsSection
        title="Projects"
        projects={projectsWithOrderData}
        onButtonClick={({ project }) => {
          setSelectedProject(project);
          setIsBuyFlowStarted(true);
        }}
      />
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        selectedProject={selectedProject}
      />
    </Box>
  );
}

export const MemoizedProjects = React.memo(ProjectsSection);
