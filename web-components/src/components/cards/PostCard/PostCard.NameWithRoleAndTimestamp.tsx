import React from 'react';
import { Box } from '@mui/material';

import { formatDate } from '../../../utils/format';
import { Subtitle } from '../../typography';

const NameWithRoleAndTimestamp = ({
  name,
  authorRole,
  timestamp,
}: {
  name: string;
  authorRole?: string;
  timestamp: string;
}): JSX.Element => (
  <Box
    sx={{
      ml: 3,
    }}
  >
    <Box>
      <Subtitle size="sm" sx={{ display: 'inline' }}>
        {name}
      </Subtitle>
      <Box
        borderRadius={1}
        sx={{
          px: 1.5,
          py: 0.5,
          ml: 2,
          backgroundColor: 'grey.300',
          display: 'inline-block',
          fontSize: '10px',
          color: 'theme.500',
          textTransform: 'uppercase',
          fontWeight: 800,
          letterSpacing: '1px',
        }}
      >
        {authorRole}
      </Box>
    </Box>
    <Box
      sx={theme => ({
        color: 'grey.700',
        fontSize: '12px',
        mt: 1.5,
      })}
    >
      {formatDate(timestamp, 'MMMM D, YYYY | h:mm A')}
    </Box>
  </Box>
);

export default NameWithRoleAndTimestamp;
