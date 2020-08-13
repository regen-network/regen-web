import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';

interface TitleProps {
  variant?: Variant;
  children?: any;
  color?: any;
  className?: string;
  onClick?: () => void;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
  },
}));

export default function Title({
  variant,
  children,
  color,
  className,
  align,
  onClick,
}: TitleProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Typography
      className={`${classes.root} ${className}`}
      color={color || 'textPrimary'}
      align={align || 'left'}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Typography>
  );
}
