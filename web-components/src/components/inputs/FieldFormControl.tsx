import React from 'react';
import { FieldProps, getIn } from 'formik';
import { Theme, makeStyles, FormHelperText, FormControl } from '@material-ui/core';

import FormLabel from './FormLabel';

interface RenderProps {
  handleChange: (value: any) => void;
  handleBlur: (value: any) => void;
}

interface Props extends FieldProps {
  children: (childProps: RenderProps) => React.ReactNode;
  className?: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
  label?: string;
  onExampleClick?: () => void;
  labelSubText?: string;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
  description?: string;
  error: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  error: props => ({
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    visibility: props.error ? 'visible' : 'hidden',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  }),
}));

/**
 *  This component uses MUI's `FormControl` component as a wrapper, and
 *  returns a render prop pattern with handlers for `onChange` and `onBlur` that will update the formik field
 */
export default function FieldFormControl({
  children,
  label,
  description,
  disabled,
  className,
  optional,
  labelSubText,
  onExampleClick,
  ...fieldProps
}: Props): JSX.Element {
  const { form, field } = fieldProps;
  const errorMessage = getIn(form.errors, field.name);
  const fieldTouched = getIn(form.touched, field.name);

  async function handleChange(value: any): Promise<void> {
    form.setFieldValue(field.name, value);
  }

  function handleBlur(value: string): void {
    form.setFieldTouched(field.name);
    form.handleBlur(value);
  }

  const hasError = fieldTouched && errorMessage;
  const styles = useStyles({ optional, disabled, description, error: hasError });
  return (
    <FormControl className={className} fullWidth>
      <FormLabel
        label={label}
        labelSubText={labelSubText}
        optional={optional}
        description={description}
        disabled={disabled}
      />
      {children({ handleChange, handleBlur })}

      {hasError && <FormHelperText className={styles.error}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
