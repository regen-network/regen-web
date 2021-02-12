import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps, getIn } from 'formik';
import PhoneInput from 'react-phone-input-2';
import FieldFormControl from './FieldFormControl';
import 'react-phone-input-2/lib/style.css';

interface RegenPhoneFieldProps extends FieldProps {
  label: string;
  optional?: boolean;
  className?: string;
}

interface StyleProps {
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  inputWrap: {
    marginTop: theme.spacing(5),
  },
  input: props => ({
    width: '100% !important',
    border: `1px solid ${theme.palette.grey[100]} !important`,
    borderRadius: '2px !important',
    color: props.disabled ? theme.palette.info.main : theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.4),
      fontSize: theme.spacing(4.5),
      height: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
  }),
}));

export default function RegenPhoneField({
  label,
  optional = false,
  className,
  ...fieldProps
}: RegenPhoneFieldProps): JSX.Element {
  const { form, field } = fieldProps; // passed from Formik <Field />
  const classes = useStyles({ disabled: form.isSubmitting });

  return (
    <FieldFormControl
      className={className}
      label={label}
      optional={optional}
      disabled={form.isSubmitting}
      {...fieldProps}
    >
      {({ handleBlur, handleChange }) => (
        <PhoneInput
          containerClass={classes.inputWrap}
          inputClass={classes.input}
          country="us"
          value={field.value}
          onChange={handleChange}
          onBlur={({ target: { value } }) => handleBlur(value)}
          enableSearch
        />
      )}
    </FieldFormControl>
  );
}
