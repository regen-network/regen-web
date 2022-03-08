import { Box, Typography } from '@mui/material';
import React from 'react';
import Title from '../title';

/** Grey label over a rounded, formatted number */
export const LabeledNumber: React.FC<{
  label: string;
  number: number | string;
}> = props => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="overline"
        sx={{
          fontSize: {
            xs: 10,
            sm: 12,
            md: 14,
          },
          fontFamily: 'muli',
          fontWeight: 800,
          color: 'info.main',
          textTransform: 'uppercase',
          lineHeight: '17.57px',
          letterSpacing: 1,
        }}
      >
        {props.label}
      </Typography>
      <Title variant="h3" sx={{ pt: 1 }}>
        {Math.round(Number(props.number)).toLocaleString()}
      </Title>
    </Box>
  );
};
