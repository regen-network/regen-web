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
    width: '100% !important',
    border: `1px solid ${theme.palette.grey[100]} !important`,
    borderRadius: '2px !important',
    alignContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: props.disabled ? theme.palette.info.main : theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.4),
      fontSize: `${theme.spacing(4.5)} !important`,
      height: `${theme.spacing(15)} !important`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6),
      fontSize: `${theme.spacing(3.5)} !important`,
      height: `${theme.spacing(12.5)} !important`,
    },
    '&::placeholder': {
      color: theme.palette.grey[400],
    },
  }),
  '& .MuiPickersYearSelection-container .MuiTypography-subtitle1': {
    fontSize: theme.spacing(4),
  },
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
