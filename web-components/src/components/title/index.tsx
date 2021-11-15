import React from 'react';
import cx from 'clsx';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';

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
  onClick?: () => void;
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
      component="div"
    >
      {children}
    </Typography>
  );
}
