import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface CancelProps {
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  cancel: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    color: theme.palette.info.main,
    cursor: 'pointer',
    letterSpacing: '1px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(32.5),
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function Cancel({ onClick }: CancelProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.cancel} onClick={onClick}>
      cancel
    </div>
  );
}
