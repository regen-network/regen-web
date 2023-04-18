import { Box } from '@mui/material';

import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { containerStyles } from 'web-components/lib/styles/container';

import { getProjectDetailsTabs } from './ProjectDetails.TableTabs.config';
import { ProjectDetailsTableTabsProps } from './ProjectDetails.TableTabs.types';

export const ProjectDetailsTableTabs = (
  props: ProjectDetailsTableTabsProps,
) => {
  const tabs = getProjectDetailsTabs(props);

  return (
    <Box sx={{ ...containerStyles }}>
      <IconTabs tabs={tabs} />
    </Box>
  );
};
