import React from 'react';
import { Box } from '@mui/material';

const ComplianceInfo: React.FC = () => {
  return (
    <Box
      sx={{
        p: 8,
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'info.light',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <h1>Compliance Info</h1>
    </Box>
  );
};

export default ComplianceInfo;
