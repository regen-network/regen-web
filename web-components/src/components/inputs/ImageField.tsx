import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, FormControl, FormHelperText, Box, Avatar } from '@material-ui/core';
import { FieldProps, getIn } from 'formik';
import OutlinedButton from '../buttons/OutlinedButton';

interface StyleProps {
  errors: boolean;
  label: boolean;
  optional: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
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
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
    '&::after': {
      content: props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
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

  const classes = useStyles({ errors: !!errorMessage, optional: !!optional, label: !!label });
  const formId = `formfield-${field.name}`;
  const helperId = `helpertxt-${field.name}`;

  return (
    <FormControl className={clsx(classes.root, props.className)} fullWidth>
      {label && (
        <label className={classes.label} htmlFor={formId}>
          {label}
        </label>
      )}

      <Box className={classes.imageBox} display="flex" alignItems="center">
        <Avatar className={classes.avatar} />
        <div>
          <OutlinedButton className={classes.button}>Upload Photo</OutlinedButton>
        </div>
      </Box>

      {touched && errorMessage && (
        <FormHelperText id={helperId} className={classes.error}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
