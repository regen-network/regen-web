import React from 'react';
import { makeStyles, Theme, Box, Avatar } from '@material-ui/core';
import { FieldProps } from 'formik';
import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from './FieldFormControl';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(22),
      width: theme.spacing(22),
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(20),
      width: theme.spacing(20),
      marginRight: theme.spacing(3),
    },
  },
  imageBox: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
  },
}));

interface ControlledTextFieldProps extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  transformValue?: (v: any) => any;
  triggerOnChange?: (v: any) => Promise<void>;
}

export default function ImageField({
  description,
  className,
  label,
  optional,
  transformValue,
  triggerOnChange,
  ...fieldProps
}: ControlledTextFieldProps): JSX.Element {
  const { form } = fieldProps; // passed from Formik <Field />
  const classes = useStyles();

  return (
    <FieldFormControl
      className={className}
      label={label}
      disabled={form.isSubmitting}
      optional={optional}
      {...fieldProps}
    >
      {({ handleBlur, handleChange }) => (
        <Box className={classes.imageBox} display="flex" alignItems="center">
          <Avatar className={classes.avatar} />
          <div>
            <OutlinedButton className={classes.button} disabled={form.isSubmitting}>
              Upload Photo
            </OutlinedButton>
          </div>
        </Box>
      )}
    </FieldFormControl>
  );
}
