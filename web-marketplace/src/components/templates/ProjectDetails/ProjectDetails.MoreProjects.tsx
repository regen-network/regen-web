import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';

import useMoreProjects from './hooks/useMoreProjects';

export function MoreProjects(): JSX.Element {
  const { projectId } = useParams();
  const { projectsWithOrderData, loading } = useMoreProjects(
    projectId as string,
  );

  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const { isKeplrMobileWeb } = useWallet();

  return (
    <Box
      className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      sx={{ pb: 9 }}
    >
      <ProjectCardsSection
        title="More Projects"
        projects={projectsWithOrderData}
        loading={loading}
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
