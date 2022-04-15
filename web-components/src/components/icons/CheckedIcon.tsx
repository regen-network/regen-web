import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/styles';
import { Theme } from '../../theme/muiTheme';

interface IconProps {
  className?: string;
  disabled?: boolean;
}

export default function CheckedIcon({
  className,
  disabled,
}: IconProps): JSX.Element {
  const theme: Theme = useTheme();

  return (
    <SvgIcon
      className={className}
      viewBox="0 0 20 20"
      sx={{
        color: disabled
          ? theme.palette.grey[100]
          : theme.palette.secondary.main,
      }}
    >
      <rect
        width="20"
        height="20"
        rx="1"
        fill={disabled ? theme.palette.grey[100] : theme.palette.secondary.main}
      />
      <path d="M3 9.5L8 14.5L17.5 5" stroke="white" strokeWidth="3" />
    </SvgIcon>
  );
}
