import React from 'react';
import { Box, SxProps } from '@mui/material';

import type { Theme } from 'src/theme/muiTheme';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  hidden?: boolean;
  sxs?: {
    inner?: SxProps<Theme>;
  };
}

const TabPanel: React.FC<React.PropsWithChildren<TabPanelProps>> = props => {
  const { children, value, index, hidden, sxs, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={!!hidden}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3, ...sxs?.inner }}>{hidden ? null : children}</Box>
    </div>
  );
};

export { TabPanel };
