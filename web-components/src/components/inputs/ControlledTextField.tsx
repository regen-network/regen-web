import React from 'react';
import { makeStyles, Theme, Typography, InputProps } from '@material-ui/core';
import { FieldProps } from 'formik';
import FieldFormControl from './FieldFormControl';
import OnboardingInput from './OnboardingInput';

interface ControlledTextFieldProps extends FieldProps, InputProps {
  charLimit?: number;
  description?: string;
  label?: string;
  optional?: boolean;
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
  description,
  label,
  optional,
  field,
  form,
  meta,
  className,
  ...inputProps
}: ControlledTextFieldProps): JSX.Element {
  const fieldProps = { field, form, meta };
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
      label={label}
      description={description}
      disabled={form.isSubmitting}
      optional={optional}
      className={className}
      {...fieldProps}
    >
      {({ handleChange, handleBlur }) => (
        <>
          <OnboardingInput
            {...inputProps}
            {...fieldProps}
            onBlur={({ target: { value } }) => handleBlur(value)}
            onChange={e => handleFieldChange(e, handleChange)}
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
