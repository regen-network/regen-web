import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';

interface LabelProps {
  children: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
  },
}));
function Label({ children, className }: LabelProps): JSX.Element {
  const styles = useStyles();

  return <Typography className={cx(styles.root, className)}>{children}</Typography>;
}

export { Label };
