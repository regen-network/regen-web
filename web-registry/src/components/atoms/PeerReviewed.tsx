import React from 'react';
import Box from '@mui/material/Box';

import { Label } from 'web-components/lib/components/typography';
import { ReactComponent as Ribbon } from '../../assets/svgs/yellow-ribbon.svg';

/**
 * Icon with yellow ribbon and 'Peer Reviewed' label
 */
const PeerReviewed: React.FC = () => {
  return (
    <Box display="flex" flexWrap="nowrap" alignItems="center">
      <Box mr={1.5}>
        <Ribbon />
      </Box>
      <Label
        color="info.main"
        sx={{ fontSize: ['9px'], lineHeight: ['11.3px'] }}
      >
        Peer <br />
        Reviewed
      </Label>
    </Box>
  );
};

export { PeerReviewed };
