import React from 'react';
import { makeStyles, Theme, Input, InputAdornment, Typography } from '@material-ui/core';
import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';

interface ControlledTextFieldProps extends FieldProps {
  startAdornment?: React.ReactNode;
  charLimit?: number;
  className?: string;
  description?: string;
  endAdornment?: React.ReactNode;
  label?: string;
  multiline?: boolean;
  optional?: boolean;
  placeholder?: string;
  rows?: number;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '2px',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      fontSize: theme.spacing(3.5),
    },
    '& .MuiInputAdornment-root p': {
      color: theme.palette.info.main,
    },
    '&.Mui-error': {
      '& input, & .MuiSelect-select': {
        borderColor: theme.palette.error.main,
      },
    },
  },
  charCount: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4),
      fontSize: theme.spacing(3.3),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      fontSize: theme.spacing(3),
    },
  },
}));

export default function ControlledTextField({
  startAdornment,
  charLimit,
  className,
  description,
  endAdornment,
  label,
  multiline,
  optional,
  placeholder,
  rows = 1,
  transformValue,
  triggerOnChange,
  ...fieldProps
}: ControlledTextFieldProps): JSX.Element {
  const { form, field } = fieldProps; // passed from Formik <Field />
  const charsLeft = (charLimit || Infinity) - (field.value?.length || 0);

  function handleFieldChange(
    { target: { value } }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    handleFn: (val: string) => void,
  ): void {
    const text = charLimit && charsLeft <= charLimit ? value.slice(0, charLimit) : value;
    handleFn(text);
  }

  const classes = useStyles();

  return (
    <FieldFormControl
      className={className}
      label={label}
      description={description}
      disabled={form.isSubmitting}
      optional={optional}
      {...fieldProps}
    >
      {({ handleChange, handleBlur }) => (
        <>
          <Input
            disableUnderline
            className={classes.input}
            disabled={form.isSubmitting}
            multiline={multiline}
            onBlur={({ target: { value } }) => handleBlur(value)}
            onChange={e => handleFieldChange(e, handleChange)}
            placeholder={placeholder}
            rows={rows}
            value={field.value}
            startAdornment={
              startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null
            }
            endAdornment={
              endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null
            }
          />
          {charLimit && (
            <Typography variant="body1" className={classes.charCount}>{`${charsLeft} character${
              charsLeft === 1 ? '' : 's'
            } remaining`}</Typography>
          )}
        </>
      )}
    </FieldFormControl>
  );
}
