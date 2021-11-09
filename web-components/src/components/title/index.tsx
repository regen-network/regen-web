import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';

interface TitleProps {
  variant?: Variant;
  children?: any;
  color?:
    | 'inherit'
    | 'initial'
    | 'textPrimary'
    | 'primary'
    | 'secondary'
    | 'textSecondary'
    | 'error';
  className?: string;
  onClick?: React.MouseEventHandler;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
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
  const styles = useStyles({});
  return (
    <Typography
      className={cx(styles.root, className)}
      color={color || 'textPrimary'}
      align={align || 'left'}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Typography>
  );
}
