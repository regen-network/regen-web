import React from 'react';
import { useParams } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

import useMoreProjects from './hooks/useMoreProjects';

export function MoreProjects(): JSX.Element {
  const { _ } = useLingui();
  const { projectId } = useParams();
  const { projectsWithOrderData, loading } = useMoreProjects(
    projectId as string,
  );

  const { isKeplrMobileWeb } = useWallet();
  const onBuyButtonClick = useOnBuyButtonClick();

  return (
    <Box
      className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      sx={{ pb: 9 }}
    >
      <ProjectCardsSection
        title={_(msg`More Projects`)}
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
  );
}

export const MemoizedMoreProjects = React.memo(MoreProjects);
