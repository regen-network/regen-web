import React from 'react';
import { makeStyles, Theme, Input, InputProps } from '@material-ui/core';
import { FieldProps } from 'formik';

interface Props extends FieldProps, InputProps {}

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
}));

const OnboardingInput: React.FC<Props> = ({ form, field, meta, startAdornment, endAdornment, ...props }) => {
  const classes = useStyles();
  return (
    <Input
      {...props}
      disableUnderline
      className={classes.input}
      disabled={form.isSubmitting}
      value={field.value}
    />
  );
};

export default OnboardingInput;
