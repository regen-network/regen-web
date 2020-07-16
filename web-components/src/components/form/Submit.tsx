import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ContainedButton from '../buttons/ContainedButton';

interface SubmitProps {
  submitCount: number;
  isValid: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  submitForm: () => void;
  status?: {
    serverError: string;
  };
  label?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  submitButton: {
    textAlign: 'right',
  },
  cancel: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'uppercase',
    color: theme.palette.info.main,
    cursor: 'pointer',
    letterSpacing: '1px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(32.5),
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function Cancel({
  isSubmitting,
  onClose,
  status,
  isValid,
  submitCount,
  submitForm,
  label = 'submit',
}: SubmitProps): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" alignItems="center" justify="flex-end">
      <Grid
        xs={5}
        item
        className={classes.cancel}
        onClick={() => {
          if (!isSubmitting) {
            onClose();
          }
        }}
      >
        cancel
      </Grid>
      <Grid xs={7} item container direction="column" justify="flex-end" className={classes.submitButton}>
        <Grid item>
          <ContainedButton disabled={(submitCount > 0 && !isValid) || isSubmitting} onClick={submitForm}>
            {label}
          </ContainedButton>
        </Grid>
        {submitCount > 0 && !isValid && (
          <Grid item className={classes.error}>
            Please correct the errors above
          </Grid>
        )}
        {status && status.serverError && (
          <Grid item className={classes.error}>
            {status.serverError}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
