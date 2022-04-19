import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

import TextField from '../inputs/TextField';
import ContainedButton from '../buttons/ContainedButton';
import {
  requiredMessage,
  validateEmail,
  invalidEmailMessage,
} from '../inputs/validation';

interface NewsletterFormProps {
  submitLabel?: string;
  inputPlaceholder?: string;
  apiUri?: string;
  textFieldClassName?: string;
  buttonClassName?: string;
  gridXs?: {
    textField:
      | boolean
      | 'auto'
      | 4
      | 5
      | 8
      | 1
      | 2
      | 3
      | 6
      | 7
      | 9
      | 10
      | 11
      | 12
      | undefined;
    button:
      | boolean
      | 'auto'
      | 4
      | 5
      | 8
      | 1
      | 2
      | 3
      | 6
      | 7
      | 9
      | 10
      | 11
      | 12
      | undefined;
  };
}

interface Values {
  email: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    maxWidth: theme.spacing(163.75),
    margin: '0 auto',
  },
  textField: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3.25),
    },
    // '& .MuiInputBase-root': {
    //   lineHeight: '150%',
    //   [theme.breakpoints.down('sm')]: {
    //     fontSize: theme.spacing(4),
    //     height: theme.spacing(15),
    //     padding: theme.spacing(5),
    //   },
    //   [theme.breakpoints.up('sm')]: {
    //     height: theme.spacing(17.75),
    //     fontSize: theme.spacing(4.5),
    //     padding: theme.spacing(5),
    //   },
    // },
  },
  success: {
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  button: {
    letterSpacing: '1px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(4.5),
      height: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6.5),
      height: theme.spacing(17.75),
    },
    '&:disabled': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export default function NewsletterForm({
  submitLabel = 'join us',
  apiUri = 'http://localhost:5000',
  inputPlaceholder = 'Your email',
  textFieldClassName,
  buttonClassName,
  gridXs = { textField: 8, button: 4 },
}: NewsletterFormProps): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validate={(values: Values) => {
        const errors: Partial<Values> = {};
        if (!values.email) {
          errors.email = requiredMessage;
        } else if (!validateEmail(values.email)) {
          errors.email = invalidEmailMessage;
        }
        return errors;
      }}
      onSubmit={({ email }, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        axios
          .post(`${apiUri}/mailerlite`, {
            email,
          })
          .then(resp => {
            setSubmitting(false);
            setStatus({ success: true });
          })
          .catch(e => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        submitForm,
        isSubmitting,
        isValid,
        submitCount,
        status,
      }) => {
        if (status && status.success) {
          return (
            <div className={classes.success}>
              Thank you!
              <p>You have successfully joined our subscriber list.</p>
            </div>
          );
        }
        return (
          <Form>
            <Grid container wrap="nowrap" className={classes.grid}>
              <Grid item xs={gridXs.textField}>
                <Field
                  placeholder={inputPlaceholder}
                  component={TextField}
                  className={clsx(textFieldClassName, classes.textField)}
                  type="email"
                  name="email"
                  defaultStyle={false}
                />
              </Grid>
              <Grid item xs={gridXs.button}>
                <ContainedButton
                  size="large"
                  className={buttonClassName}
                  disabled={(submitCount > 0 && !isValid) || isSubmitting}
                  onClick={submitForm}
                >
                  {submitLabel}
                </ContainedButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
