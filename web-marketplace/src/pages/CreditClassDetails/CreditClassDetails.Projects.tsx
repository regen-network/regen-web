import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useProjectsWithOrders } from 'hooks/projects/useProjectsWithOrders';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

interface Props {
  classId: string;
}

function ProjectsSection({ classId }: Props): JSX.Element {
  const { _ } = useLingui();
  const { projectsWithOrderData, loading } = useProjectsWithOrders({
    classId,
    showCommunityProjects: true,
    enableOffchainProjectsQuery: false,
  });

  const { isKeplrMobileWeb } = useWallet();
  const hasProjects = projectsWithOrderData.length > 0;
  const onBuyButtonClick = useOnBuyButtonClick();

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
            title={_(msg`Projects`)}
            projects={projectsWithOrderData}
            loading={loading}
            onButtonClick={({ project }) => {
              onBuyButtonClick({
                projectId: project?.id,
                cardSellOrders: project?.cardSellOrders,
                loading,
              });
            }}
          />
        </Box>
      )}
    </>
  );
}

export const MemoizedProjects = React.memo(ProjectsSection);
