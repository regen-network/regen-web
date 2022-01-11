import React from 'react';
import { makeStyles, Theme, Typography, InputProps, InputAdornment } from '@material-ui/core';
import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
import Input from './Input';

interface ControlledTextFieldProps extends FieldProps, InputProps {
  charLimit?: number;
  description?: string;
  label?: string;
  optional?: boolean;
  onExampleClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  charLimit,
  className,
  description,
  endAdornment,
  field,
  form,
  label,
  meta,
  optional,
  startAdornment,
  onExampleClick,
  ...inputProps
}: ControlledTextFieldProps): JSX.Element {
  const charsLeft = (charLimit || Infinity) - ((field && field.value && field.value.length) || 0);

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
      label={label}
      description={description}
      onExampleClick={onExampleClick}
      disabled={form.isSubmitting}
      optional={optional}
      className={className}
      field={field}
      form={form}
      meta={meta}
    >
      {({ handleChange, handleBlur }) => (
        <>
          <Input
            {...inputProps}
            onBlur={({ target: { value } }) => handleBlur(value)}
            onChange={e => handleFieldChange(e, handleChange)}
            value={field.value}
            disabled={form.isSubmitting}
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
