import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& label': {
      transform: 'scale(1)',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(4),
      },
      '&.Mui-focused': {
        display: 'block',
      },
    },
    '& .MuiInput-formControl': {
      marginTop: theme.spacing(7),
    },
    '& input': {
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '2px',
      height: theme.spacing(12.5),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3.75),
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(3.25),
      },
    },
  },
}));

interface RegenTextFieldProps {}

export default function RegenTextField({ ...props }: RegenTextFieldProps): JSX.Element {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      className={classes.root}
      InputProps={{ disableUnderline: true }}
      InputLabelProps={{ focused: false }}
    />
  );
}
