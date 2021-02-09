import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps } from 'formik';
// import { TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface RegenPhoneFieldProps extends FieldProps {
  errors?: boolean;
  label: string;
  optional?: boolean;
}

interface StyleProps extends FieldProps {
  errors: boolean;
  optional: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(5.5),
  },
  input: {
    width: '100% !important',
    border: `1px solid ${theme.palette.grey[100]} !important`,
    borderRadius: '2px !important',
    // fontSize: 'inherit !important',
    // padding: theme.spacing(7.4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.4),
      fontSize: theme.spacing(4.5),
      height: theme.spacing(15), // 11.25
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      fontSize: theme.spacing(4),
      height: theme.spacing(12.5), // 8.75
    },
  },
  inputWrap: {
    marginTop: theme.spacing(5),
  },
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    position: 'relative',
    fontFamily: '"Lato",-apple-system,sans-serif',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    '&::after': {
      content: props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
}));

export default function RegenPhoneField({
  label,
  errors = false,
  optional = false,
  ...props
}: RegenPhoneFieldProps): JSX.Element {
  const classes = useStyles({ ...props, optional, errors });
  return (
    <div className={classes.root}>
      <label className={classes.label}>{label}</label>
      <PhoneInput containerClass={classes.inputWrap} inputClass={classes.input} country="us" enableSearch />
    </div>
  );
}
