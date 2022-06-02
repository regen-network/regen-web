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
  const isHidden = hidden || value !== index;

  return (
    <div
      role="tabpanel"
      hidden={isHidden}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {!isHidden && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export { TabPanel };
