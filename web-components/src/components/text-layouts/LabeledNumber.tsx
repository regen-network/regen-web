import React from 'react';
import { SxProps, Theme } from '@mui/material';

import Title from '../title';
import { LabeledDetail } from './LabeledDetail';

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
  sx,
  styles,
}: {
  label: string;
  number: number | string;
  sx?: SxProps<Theme>;
  styles?: {
    label?: SxProps<Theme>;
    number?: SxProps<Theme>;
  };
}): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      sx={{
        height: '100%',
        justifyContent: 'space-between',
        ...sx,
      }}
      styles={{
        label: styles?.label,
      }}
    >
      <Title variant="h3" sx={styles?.number}>
        {Math.round(Number(number)).toLocaleString()}
      </Title>
    </LabeledDetail>
  );
}
