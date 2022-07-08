import React from 'react';
import { SxProps, Card as MuiCard } from '@mui/material';
import type { Theme } from '~/theme/muiTheme';

interface Props {
  children?: any;
  width?: string;
  height?: string;
  onClick?: () => void;
  elevation?: number;
  borderColor?: string;
  borderRadius?: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export function Card({
  children,
  width,
  height,
  onClick,
  elevation = 0,
  borderColor,
  borderRadius,
  className,
  sx = [],
}: Props): JSX.Element {
  return (
    <MuiCard
      onClick={onClick}
      className={className}
      elevation={elevation}
      sx={[
        {
          border: 1,
          borderColor: borderColor || 'info.light',
          borderRadius: borderRadius || '5px',
          maxWidth: width || '100%',
          height: height || 'inherit',
          cursor: onClick ? 'pointer' : 'inherit',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiCard>
  );
}

export default Card;
