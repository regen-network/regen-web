import React from 'react';

import { formatNumber } from '../../utils/format';
import { Title } from '../typography';
import { LabeledDetail } from './LabeledDetail';

type Props = {
  label: string;
  number: number | string;
  formatNumberOptions?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
};

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  number,
  formatNumberOptions = {},
}: Props): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      sx={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Title variant="h3">
        {formatNumber({
          num: number,
          ...formatNumberOptions,
        })}
      </Title>
    </LabeledDetail>
  );
}
