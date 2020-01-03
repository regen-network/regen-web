import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

interface TitleProps {
  variant: ThemeStyle;
  children?: any;
  color?: any;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
}));

export default function Title({ variant, children, color, className }: TitleProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Typography
      className={`${classes.root} ${className}`}
      color={color || 'textPrimary'}
      align="left"
      variant={variant}>
      {children}
    </Typography>
  );
}
