import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ContainedButton from '../buttons/ContainedButton';

interface SubmitProps {
  className?: string;
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
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      paddingRight: theme.spacing(4.5),
    },
  },
  button: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(53.25),
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

export default function Submit({
  className,
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
    <Grid
      className={className}
      container
      wrap="nowrap"
      alignItems="center"
      justifyContent="flex-end"
    >
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
      <Grid
        xs={7}
        item
        container
        direction="column"
        justifyContent="flex-end"
        className={classes.submitButton}
      >
        <Grid item>
          <ContainedButton
            className={classes.button}
            disabled={(submitCount > 0 && !isValid) || isSubmitting}
            onClick={submitForm}
          >
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
