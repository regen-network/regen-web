import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  hidden?: boolean;
}

const TabPanel: React.FC<TabPanelProps> = props => {
  const { children, value, index, hidden, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={!!hidden}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{hidden ? null : children}</Box>
    </div>
  );
};

export { TabPanel };
