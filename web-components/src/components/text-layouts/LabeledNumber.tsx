import React from 'react';
import { Box } from '@mui/material';

import Title from '../title';
import { Label } from '../label';

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
}: {
  label: string;
  number: number | string;
}): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Label
        sx={{
          color: 'info.main',
          fontSize: { xs: 12, md: 14 },
          lineHeight: '17.57px',
        }}
      >
        {label}
      </Label>
      <Title variant="h3" sx={{ pt: 1 }}>
        {Math.round(Number(number)).toLocaleString()}
      </Title>
    </Box>
  );
}
