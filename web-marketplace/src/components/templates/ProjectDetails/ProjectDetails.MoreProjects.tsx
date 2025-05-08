import React from 'react';
import { msg, useLingui } from '@lingui/react';
import Box from '@mui/material/Box';
import cx from 'classnames';

import { Account } from 'web-components/src/components/user/UserInfo';

import { useWallet } from 'lib/wallet/wallet';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

import useMoreProjects from './hooks/useMoreProjects';

type Props = { skippedProjectId: string; projectAdmin?: Account };

export function MoreProjects({
  skippedProjectId,
  projectAdmin,
}: Props): JSX.Element {
  const { _ } = useLingui();
  const { projectsWithOrderData, loading } = useMoreProjects(
    skippedProjectId,
    projectAdmin,
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
