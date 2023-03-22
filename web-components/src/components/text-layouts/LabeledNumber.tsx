import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import { formatNumber } from '../../utils/format';
import GradientBadge from '../gradient-badge';
import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Title } from '../typography';
import { LabeledDetail } from './LabeledDetail';

type Props = {
  label: string;
  badgeLabel?: string;
  icon?: ReactNode;
  tooltipLabel?: string;
  tooltipNumber?: string;
  number?: number | string;
  formatNumberOptions?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
};

/** Grey label over a rounded, formatted number */
export function LabeledNumber({
  label,
  badgeLabel,
  icon,
  tooltipLabel,
  tooltipNumber,
  number,
  formatNumberOptions = {},
}: Props): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      tooltipLabel={tooltipLabel}
      sx={{
        height: '100%',
      }}
      sxLabel={{ width: 'fit-content' }}
      sxChildren={{ height: '100%' }}
    >
      {icon && <Box sx={{ mr: 2.5, display: 'inline-flex' }}>{icon}</Box>}
      <Title variant="h3">
        {formatNumber({
          num: number,
          ...formatNumberOptions,
        })}
      </Title>
      {badgeLabel && <GradientBadge label={badgeLabel} />}
      {tooltipNumber && (
        <InfoTooltipWithIcon title={tooltipNumber} sx={{ ml: 1 }} outlined />
      )}
    </LabeledDetail>
  );
}
