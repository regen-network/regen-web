import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Card, Grid } from '@material-ui/core';
import { Form } from 'formik';
import ContainedButton from '../buttons/ContainedButton';

interface Props {
  cancelText?: string;
  children: React.ReactNode;
  onCancel?: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  submitText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: theme.spacing(140),
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(9)} 0 ${theme.spacing(12)}`,
      padding: `${theme.spacing(13.5)} ${theme.spacing(10)} ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(6.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
      padding: `${theme.spacing(8.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
  },
  form: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(4.5),
      },
      '& .MuiFormControl-root:first-of-type': {
        marginTop: 0,
      },
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6.25),
    },
  },
  cancel: {
    color: theme.palette.secondary.dark,
  },
}));

/**
 *
 * Wraps content with a formik `<Form>` and MUI `Card` with a contained
 * maxWidth, prives margin for any child `FormControl` elements, and provides
 * buttons for submit / cancel
 */
export default function FormWrapCard({
  cancelText = 'Cancel',
  children,
  onCancel,
  onSubmit,
  submitDisabled,
  submitText = 'Next',
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Form className={classes.form} translate="yes">
      <Card className={classes.card}>
        {children}
        <Grid container justify={!!onCancel ? 'space-between' : 'flex-end'}>
          {!!onCancel && (
            <ContainedButton
              variant="text"
              onClick={onSubmit}
              className={clsx(classes.button, classes.cancel)}
              disabled={submitDisabled}
            >
              {cancelText}
            </ContainedButton>
          )}
          <ContainedButton onClick={onSubmit} className={classes.button} disabled={submitDisabled}>
            {submitText}
          </ContainedButton>
        </Grid>
      </Card>
    </Form>
  );
}
