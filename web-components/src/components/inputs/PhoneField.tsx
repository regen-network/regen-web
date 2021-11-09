import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps } from 'formik';
import PhoneInput from 'react-phone-input-2';

import FieldFormControl from './FieldFormControl';
import 'react-phone-input-2/lib/style.css';

interface RegenPhoneFieldProps extends FieldProps {
  className?: string;
  label: string;
  optional?: boolean;
  placeholder?: string;
}

interface StyleProps {
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  input: props => ({
    width: '100% !important',
    border: `1px solid ${theme.palette.grey[100]} !important`,
    borderRadius: '2px !important',
    color: props.disabled
      ? theme.palette.info.main
      : theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.4),
      fontSize: `${theme.typography.pxToRem(16)} !important`,
      lineHeight: `${theme.typography.pxToRem(24)} !important`,
      height: `${theme.spacing(15)} !important`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      fontSize: `${theme.typography.pxToRem(14)} !important`,
      lineHeight: `${theme.typography.pxToRem(21)} !important`,
      height: `${theme.spacing(12.5)} !important`,
    },
    '&::placeholder': {
      color: theme.palette.grey[400],
    },
  }),
}));

export default function RegenPhoneField({
  label,
  className,
  optional = false,
  placeholder,
  ...fieldProps
}: RegenPhoneFieldProps): JSX.Element {
  const [countryCode, setCountryCode] = useState('us');
  const { form, field } = fieldProps;
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
          autoFormat={countryCode === 'us'}
          inputClass={classes.input}
          country={countryCode}
          value={field.value}
          onChange={(value: string, data: any) => {
            setCountryCode(data.countryCode);
            handleChange(value);
          }}
          onBlur={({ target: { value } }) => handleBlur(value)}
          placeholder={placeholder}
          enableSearch
        />
      )}
    </FieldFormControl>
  );
}
