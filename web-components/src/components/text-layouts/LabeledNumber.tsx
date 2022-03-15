import React from 'react';
import { SxProps, Theme } from '@mui/material';

import Title from '../title';
import { LabeledDetail } from './LabeledDetail';

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
  sx,
}: {
  label: string;
  number: number | string;
  sx?: {
    root?: SxProps<Theme>;
    label?: SxProps<Theme>;
    number?: SxProps<Theme>;
  };
}): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      sx={{
        root: {
          height: '100%',
          justifyContent: 'space-between',
          ...sx?.root,
        },
        label: sx?.label,
      }}
    >
      <Title variant="h3" sx={sx?.number}>
        {Math.round(Number(number)).toLocaleString()}
      </Title>
    </LabeledDetail>
  );
}
