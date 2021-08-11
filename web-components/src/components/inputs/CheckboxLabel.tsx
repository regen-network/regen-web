import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CheckboxProps } from 'formik-material-ui';
import { getIn } from 'formik';

import Checkbox from '../inputs/Checkbox';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
    '& .MuiFormHelperText-root': {
      fontWeight: 'bold',
      paddingLeft: theme.spacing(8),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3),
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },
  },
}));

interface CheckboxLabelProps extends CheckboxProps {
  label: React.ReactNode;
}

export default function CheckboxLabel({ label, ...props }: CheckboxLabelProps): JSX.Element {
  const classes = useStyles();
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={props.className}
        control={<Checkbox field={props.field} form={props.form} meta={props.meta} />}
        label={label}
      />
      {showError && <FormHelperText error={showError}>{fieldError}</FormHelperText>}
    </div>
  );
}
