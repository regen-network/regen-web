import React from 'react';
import { Box } from '@mui/material';

import { Subtitle } from '../typography';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  optional?: boolean | string;
}

/**
 *  manually re-implements MUI's FormLabel component to allow more control over positioning etc
 */
export default function ControlledFormLabel({
  children,
  optional,
  disabled,
}: Props): JSX.Element {
  const optionalText =
    typeof optional === 'string' ? `"${optional}"` : '"(optional)"';
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}
    >
      <Subtitle
        size="lg"
        as="label"
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: disabled ? 'info.main' : 'primary.contrastText',
          '&::after': {
            color: 'info.main',
            fontWeight: 'normal',
            ml: 1,
            fontSize: [14, 16],
            content: optional ? optionalText : '""',
          },
        }}
      >
        {children}
      </Subtitle>
    </Box>
  );
}
