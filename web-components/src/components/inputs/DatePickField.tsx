import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps } from 'formik';
import { DatePicker, DatePickerView } from '@material-ui/pickers';

import FieldFormControl from './FieldFormControl';

interface DatePickProps extends FieldProps {
  className?: string;
  label: string;
  optional?: boolean;
  placeholder?: string;
  pickerViews: DatePickerView[];
}

interface StyleProps {
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  inputWrap: {
    marginTop: theme.spacing(5),
  },
  input: props => ({
    border: `1px solid ${theme.palette.grey[100]}`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    background: theme.palette.primary.main,
    color: props.disabled
      ? theme.palette.info.main
      : theme.palette.primary.contrastText,
    margin: theme.spacing(3.25, 0, 0),
    transition: '300ms ease-in-out;',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3.5),
      fontSize: `${theme.spacing(3.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.25),
      fontSize: `${theme.spacing(4)}`,
    },
    '&::placeholder': {
      color: theme.palette.grey[400],
    },
  }),
}));

export default function DatePickField({
  label,
  className,
  optional = false,
  placeholder,
  pickerViews,
  ...fieldProps
}: DatePickProps): JSX.Element {
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
      {({ handleChange }) => (
        <DatePicker
          autoOk
          variant="inline"
          openTo="year"
          disabled={form.isSubmitting}
          className={classes.input}
          placeholder="Click to choose a date"
          views={['year', 'month']}
          value={field.value}
          onChange={handleChange}
          error={false}
          InputProps={{ disableUnderline: true }}
        />
      )}
    </FieldFormControl>
  );
}
