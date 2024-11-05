import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import { formatDate, formatNumber } from '../../utils/format';
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
  date?: Date | string;
  formatNumberOptions?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  formatDateOption?: string;
  tooltipClassName?: string;
};

/** Grey label over a rounded, formatted number */
export function LabeledValue({
  label,
  badgeLabel,
  icon,
  tooltipLabel,
  tooltipNumber,
  number,
  date,
  formatDateOption,
  formatNumberOptions = {},
  children,
  tooltipClassName,
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <LabeledDetail
      label={label}
      tooltipLabel={tooltipLabel}
      sx={{
        height: '100%',
      }}
      sxLabel={{ width: 'fit-content' }}
      sxChildren={{ height: '100%' }}
      tooltipClassName={tooltipClassName}
    >
      {icon && <Box sx={{ mr: 2.5, display: 'inline-flex' }}>{icon}</Box>}
      <Title
        variant="h3"
        className={(number || date) && badgeLabel ? 'mr-[7.5px]' : ''}
      >
        {number &&
          formatNumber({
            num: number,
            ...formatNumberOptions,
          })}
        {date && formatDate(date, formatDateOption)}
      </Title>
      {children}
      {badgeLabel && <GradientBadge label={badgeLabel} />}
      {tooltipNumber && (
        <InfoTooltipWithIcon
          title={tooltipNumber}
          sx={{ ml: 1 }}
          outlined
          className={tooltipClassName}
        />
      )}
    </LabeledDetail>
  );
}
