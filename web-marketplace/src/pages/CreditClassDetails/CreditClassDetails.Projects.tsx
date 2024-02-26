import React, { useState } from 'react';
import Box from '@mui/material/Box';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';

interface Props {
  classId: string;
}

function ProjectsSection({ classId }: Props): JSX.Element {
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    classId,
    useCommunityProjects: true,
    enableOffchainProjectsQuery: false,
  });

  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const { isKeplrMobileWeb } = useWallet();
  const hasProjects = projectsWithOrderData.length > 0;

  return (
    <>
      {hasProjects && (
        <Box
          className={cx(
            'topo-background-alternate',
            isKeplrMobileWeb && 'dark',
          )}
          sx={{ pb: 9 }}
        >
          <ProjectCardsSection
            title="Projects"
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
      )}
    </>
  );
}

export const MemoizedProjects = React.memo(ProjectsSection);
