import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MuiButton } from '@material-ui/core';
import cx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    letterSpacing: '1px',
    boxShadow: 'none',
    textAlign: 'center',
  },
}));

function Button({ ...props }): JSX.Element {
  const styles = useStyles();

  return (
    <MuiButton classes={{ root: cx(styles.root, props.className) }} {...props}>
      {props.children}
    </MuiButton>
  );
}

export { Button };
