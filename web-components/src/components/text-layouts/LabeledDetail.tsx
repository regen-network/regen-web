import React from 'react';
import { SxProps } from '@mui/material';

import type { Theme } from '../../theme/muiTheme';
import { Flex } from '../box';
import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Label } from '../typography';
import type { LabelSize } from '../typography/sizing';

/** Grey label over child elements */
export const LabeledDetail: React.FC<
  React.PropsWithChildren<{
    label: string;
    tooltipLabel?: string;
    sx?: SxProps<Theme>;
    sxLabel?: SxProps<Theme>;
    sxChildren?: SxProps<Theme>;
    labelSize?: LabelSize;
    tooltipClassName?: string;
  }>
> = ({
  label,
  tooltipLabel,
  children,
  labelSize,
  sx = [],
  sxLabel = [],
  sxChildren = [],
  tooltipClassName,
}) => (
  <Flex col sx={{ gap: 2, ...sx }}>
    <Flex alignItems="center">
      <Label
        size={labelSize || 'sm'}
        sx={[
          {
            color: 'info.main',
            width: '100%',
            whiteSpace: 'nowrap',
          },
          ...(Array.isArray(sxLabel) ? sxLabel : [sxLabel]),
        ]}
      >
        {label}
      </Label>
      {tooltipLabel && (
        <InfoTooltipWithIcon
          title={tooltipLabel}
          sx={{ ml: 2 }}
          outlined
          className={tooltipClassName}
        />
      )}
    </Flex>
    <Flex alignItems="center" sx={sxChildren}>
      {children}
    </Flex>
  </Flex>
);
