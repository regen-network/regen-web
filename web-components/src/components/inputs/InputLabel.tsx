import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    lineHeight: '140%',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
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
