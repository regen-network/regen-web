import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { FormControl, FormLabel } from '@material-ui/core';
import 'react-phone-input-2/lib/style.css';

interface RegenPhoneFieldProps extends FieldProps {
  errors?: boolean;
  label: string;
  optional?: boolean;
  className?: string;
}

interface StyleProps extends FieldProps {
  errors: boolean;
  optional: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: props.errors ? theme.spacing(5.25) : 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: props.errors ? theme.spacing(4.75) : 0,
    },
    '& label': {
      lineHeight: '140%',
      transform: 'scale(1)',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      position: 'relative',
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
    '& .MuiFormLabel-root': {
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
      '&.Mui-error': {
        color: theme.palette.primary.contrastText,
      },
    },
    '& .MuiFormHelperText-root': {
      fontWeight: 'bold',
      position: props.errors ? 'absolute' : 'inherit',
      bottom: 0,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3),
      },
    },
  }),
  inputWrap: {
    marginTop: theme.spacing(5),
  },
  input: {
    width: '100% !important',
    border: `1px solid ${theme.palette.grey[100]} !important`,
    borderRadius: '2px !important',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.4),
      fontSize: theme.spacing(4.5),
      height: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      fontSize: theme.spacing(4),
      height: theme.spacing(12.5),
    },
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontSize: theme.spacing(3.5),
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function RegenPhoneField({
  label,
  optional = false,
  ...props
}: RegenPhoneFieldProps): JSX.Element {
  const {
    form: { setFieldValue, errors: formikErrors },
    field: { name, value },
  } = props;

  const fieldError = formikErrors[name];
  const classes = useStyles({ ...props, optional, errors: !!fieldError });

  return (
    <FormControl className={clsx(classes.root, props.className)} fullWidth>
      <FormLabel>{label}</FormLabel>
      <PhoneInput
        containerClass={classes.inputWrap}
        inputClass={classes.input}
        country="us"
        value={value}
        onChange={number => setFieldValue(name, number)}
        enableSearch
      />
      {fieldError && <p className={classes.error}>{fieldError}</p>}
    </FormControl>
  );
}
