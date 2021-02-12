import React from 'react';
import { makeStyles, Theme, Box, Avatar } from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import OutlinedButton from '../buttons/OutlinedButton';
import FieldFormControl from './FieldFormControl';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(20),
      width: theme.spacing(20),
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
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
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
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

export default function ControlledTextField({
  description,
  label,
  optional,
  transformValue,
  triggerOnChange,
  ...props
}: ControlledTextFieldProps): JSX.Element {
  const { form, field } = props; // passed from Formik <Field />
  const errorMessage = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  async function handleChange({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
    if (triggerOnChange) {
      await triggerOnChange(value);
    }
    form.setFieldValue(field.name, transformValue ? transformValue(value) : value);
  }

  const classes = useStyles();

  return (
    <FieldFormControl
      className={props.className}
      errorMessage={touched && errorMessage}
      label={label}
      disabled={form.isSubmitting}
    >
      <Box className={classes.imageBox} display="flex" alignItems="center">
        <Avatar className={classes.avatar} />
        <div>
          <OutlinedButton className={classes.button} disabled={form.isSubmitting}>
            Upload Photo
          </OutlinedButton>
        </div>
      </Box>
    </FieldFormControl>
  );
}
