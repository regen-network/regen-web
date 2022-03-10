import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { SxProps } from '@mui/system';
import Typography from '@mui/material/Typography';
import cx from 'clsx';

interface LabelProps {
  children: string;
  className?: string;
  sx?: SxProps<Theme>;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
}));
function Label({ children, className, sx }: LabelProps): JSX.Element {
  const styles = useStyles();

  return (
    <Typography sx={sx} className={cx(styles.root, className)}>
      {children}
    </Typography>
  );
}

export { Label };
