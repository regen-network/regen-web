import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField, { StandardTextFieldProps as TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
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
      marginTop: props.label ? theme.spacing(7) : 0,
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(3.25),
      height: theme.spacing(2.5),
      top: 'calc(50% - 5px)',
      [theme.breakpoints.up('sm')]: {
        right: theme.spacing(3.75),
      },
      [theme.breakpoints.down('xs')]: {
        right: theme.spacing(3.25),
      },
      position: 'absolute',
      pointerEvents: 'none',
    },
    '& input, & select.MuiSelect-select': {
      border: `1px solid ${theme.palette.grey[50]}`,
      borderRadius: '2px',
      height: theme.spacing(12.5),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3.75),
        paddingRight: theme.spacing(3.75),
      },
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(3.25),
        paddingRight: theme.spacing(3.25),
      },
    },
  }),
}));

interface RegenTextFieldProps extends TextFieldProps {
  children?: any;
}

interface StyleProps extends TextFieldProps {}

export default function RegenTextField({ children, ...props }: RegenTextFieldProps): JSX.Element {
  const classes = useStyles({ ...props });
  return (
    <TextField
      {...props}
      className={`${classes.root} ${props.className}`}
      InputProps={{ disableUnderline: true }}
      InputLabelProps={{ focused: false }}
      fullWidth
    >
      {children}
    </TextField>
  );
}
