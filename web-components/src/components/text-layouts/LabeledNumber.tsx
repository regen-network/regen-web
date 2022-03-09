import React from 'react';
import { Box, Typography } from '@mui/material';
import Title from '../title';

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
}: {
  label: string;
  number: number | string;
}): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="overline"
        sx={{
          fontSize: {
            xs: 12,
            sm: 14,
          },
          fontFamily: 'muli',
          fontWeight: 800,
          color: 'info.main',
          textTransform: 'uppercase',
          lineHeight: '17.57px',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
      <Title variant="h3" sx={{ pt: 1 }}>
        {Math.round(Number(number)).toLocaleString()}
      </Title>
    </Box>
  );
}
