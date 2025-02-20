import React from 'react';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';

interface CloseIconProps extends SvgIconProps {
  svgColor?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
}));

export default function CloseIcon({
  svgColor,
  className,
  ...props
}: CloseIconProps): JSX.Element {
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <SvgIcon
      viewBox="0 0 26 26"
      className={cn(classes.root, className)}
      {...props}
    >
      <rect
        x="7.08997"
        y="20.0477"
        width="2"
        height="17.9581"
        rx="0.25"
        transform="rotate(-135 7.08997 20.0477)"
        fill={svgColor || 'currentColor' || theme.palette.info.dark}
      />
      <rect
        width="2"
        height="17.9581"
        rx="0.25"
        transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 18.42 20.1125)"
        fill={svgColor || 'currentColor' || theme.palette.info.dark}
      />
    </SvgIcon>
  );
}
