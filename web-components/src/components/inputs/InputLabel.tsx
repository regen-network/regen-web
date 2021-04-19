import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiInputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    lineHeight: '140%',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
}));

export default function RegenInputLabel(props: InputLabelProps): JSX.Element {
  const classes = useStyles();

  return (
    <MuiInputLabel {...props} classes={{ root: classes.root }}>
      {props.children}
    </MuiInputLabel>
  );
}
