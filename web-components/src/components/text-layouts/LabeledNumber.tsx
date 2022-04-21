import React from 'react';

import { Title } from '../typography';
import { LabeledDetail } from './LabeledDetail';

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
}: {
  label: string;
  number: number | string;
}): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      sx={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Title variant="h3">{Math.round(Number(number)).toLocaleString()}</Title>
    </LabeledDetail>
  );
}
