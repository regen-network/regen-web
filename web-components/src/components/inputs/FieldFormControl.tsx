import React from 'react';
import { FieldProps, getIn } from 'formik';
import { Theme, makeStyles, FormHelperText, Typography, FormControl } from '@material-ui/core';

import ControlledFormLabel from '../form/ControlledFormLabel';

interface RenderProps {
  handleChange: (value: string) => void;
  handleBlur: (value: string) => void;
}

interface Props extends FieldProps {
  children: (childProps: RenderProps) => React.ReactNode;
  className?: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
  label?: string;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
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
  txtGray: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  },
  filler: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3),
    },
  },
}));

/**
 *  This component uses MUI's `FormControl` component as a wrapper, and provides
 *  styled decorations for label, description, and error message with our custom styles
 *  returns a render prop pattern with handlers for `onChange` and `onBlur` that will update the formik field
 */
export default function FieldFormControl({
  children,
  label,
  description,
  disabled,
  className,
  optional,
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

  const classes = useStyles({ optional, disabled, error: fieldTouched && errorMessage });
  return (
    <FormControl className={className} fullWidth>
      {label && (
        <ControlledFormLabel optional={optional} disabled={disabled}>
          {label}
        </ControlledFormLabel>
      )}

      {description && (
        <Typography variant="body1" className={classes.txtGray}>
          {description}
        </Typography>
      )}

      {children({ handleChange, handleBlur })}

      <FormHelperText className={classes.error}>{errorMessage || 'this text is hidden'}</FormHelperText>
    </FormControl>
  );
}
