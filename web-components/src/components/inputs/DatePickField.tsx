import React from 'react';
import { FieldProps } from 'formik';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SxProps, TextField } from '@mui/material';
import { TextFieldProps } from 'formik-mui';

import { Theme } from '../../theme/muiTheme';
import FieldFormControl from './FieldFormControl';

interface DatePickProps extends FieldProps {
  sx?: SxProps<Theme>;
  label: string;
  optional?: boolean;
  placeholder?: string;
}

interface StyleProps extends TextFieldProps {
  errors: boolean;
  optional: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    '& .MuiInputBase-formControl': {
      marginTop: props.label ? theme.spacing(2.25) : 0,
      [theme.breakpoints.up('sm')]: {
        marginBottom: props.errors ? theme.spacing(5.25) : 0,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: props.errors ? theme.spacing(4.75) : 0,
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-error': {
        color: theme.palette.primary.contrastText,
      },
      '&::after': {
        content: props.optional ? '" (optional)"' : '',
        fontWeight: 'normal',
        color: theme.palette.info.main,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(3.5),
        },
      },
    },
    '& .MuiFormHelperText-root': {
      fontWeight: 'bold',
      color: theme.palette.primary.light,
      position: props.errors ? 'absolute' : 'inherit',
      bottom: 0,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
      '&.MuiFormHelperText-filled': {
        color: theme.palette.info.main,
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
    '& .MuiInputBase-root': {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: '2px',
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(3.75),
        fontSize: theme.spacing(4.5),
        height: theme.spacing(15), // 11.25
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: theme.spacing(3.25),
        fontSize: theme.spacing(4),
        height: theme.spacing(12.5), // 8.75
      },
      '& .MuiInputBase-input[value=""]': {
        color: theme.palette.info.main,
      },
      '&.Mui-error': {
        '& input, & .MuiSelect-select': {
          borderColor: theme.palette.error.main,
        },
      },
    },
    '& input[type=number]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },

    '& fieldset': {
      border: 0,
    },
  }),

  adornment: props => ({
    '& svg': {
      color: props.disabled
        ? theme.palette.info.light
        : theme.palette.secondary.main,
    },
  }),
  dialog: {
    // To fix a button styling bug:
    '& .PrivatePickersYear-yearButton': {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(4),
      },
    },
    '& .MuiDialogActions-root button': {
      color: theme.palette.secondary.main,
    },
  },
}));

const DatePickField: React.FC<DatePickProps> = ({
  label,
  sx,
  optional = false,
  placeholder,
  ...fieldProps
}) => {
  const { form, field, meta } = fieldProps;
  const styles = useStyles({
    disabled: form.isSubmitting,
    errors: !!form.errors[field.name],
    optional,
    field,
    form,
    meta,
  });

  return (
    <FieldFormControl
      label={label}
      optional={optional}
      disabled={form.isSubmitting}
      {...fieldProps}
    >
      {({ handleChange }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            renderInput={params => (
              <TextField className={styles.root} {...params} />
            )}
            openTo="year"
            disabled={form.isSubmitting}
            value={field.value}
            onChange={handleChange}
            toolbarPlaceholder={placeholder}
            InputAdornmentProps={{
              classes: {
                root: styles.adornment,
              },
            }}
            PaperProps={{
              classes: {
                root: styles.dialog,
              },
            }}
            DialogProps={{
              classes: {
                root: styles.dialog,
              },
            }}
            {...fieldProps}
          />
        </LocalizationProvider>
      )}
    </FieldFormControl>
  );
};

export { DatePickField };
