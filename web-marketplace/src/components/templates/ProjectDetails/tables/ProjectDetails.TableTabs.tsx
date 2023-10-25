import { Box } from '@mui/material';
import cx from 'classnames';

import { useWallet } from 'lib/wallet/wallet';

import { TableTabs } from 'components/organisms/TableTabs';

import { getProjectDetailsTabs } from './ProjectDetails.TableTabs.config';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const ProjectDetailsTableTabs = ({
  sx,
  ...props
}: ProjectDetailsTableTabsProps) => {
  const tabs = getProjectDetailsTabs(props);
  const { isKeplrMobileWeb } = useWallet();

  return tabs.length > 0 ? (
    <Box
      className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      sx={{ ':nth-of-type(odd)': { pt: { xs: 25 } } }}
    >
      <TableTabs tabs={tabs} sx={sx} />
    </Box>
  ) : null;
};
