import React from 'react';
import { ButtonProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import TextField from '../inputs/TextField';
import { validateEmail } from '../inputs/validation';

interface NewsletterFormProps {
  submitLabel: string;
  inputPlaceholder: string;
  apiUri?: string;
  textFieldClassName?: string;
  buttonClassName?: string;
  successChildren: React.ReactNode;
  buttonSize?: ButtonProps['size'];
  requiredMessage: string;
  invalidEmailMessage: string;
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

const useStyles = makeStyles()((theme: Theme) => ({
  grid: {
    maxWidth: theme.spacing(163.75),
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    },
  },
  textField: {
    width: 'auto',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3.25),
    },
  },
  success: {
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  button: {
    letterSpacing: '1px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
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
  submitLabel,
  apiUri = 'http://localhost:5000',
  inputPlaceholder,
  textFieldClassName,
  buttonClassName,
  buttonSize = 'small',
  successChildren,
  requiredMessage,
  invalidEmailMessage,
  gridXs = { textField: 8, button: 4 },
}: NewsletterFormProps): JSX.Element {
  const { classes, cx } = useStyles();

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
          .post(`${apiUri}/subscribers/v1/add`, {
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
          return successChildren;
        }
        return (
          <Form>
            <Grid container wrap="nowrap" className={classes.grid}>
              <Grid item xs={gridXs.textField}>
                <Field
                  placeholder={inputPlaceholder}
                  component={TextField}
                  className={cx(textFieldClassName, classes.textField)}
                  type="email"
                  name="email"
                  defaultStyle={false}
                />
              </Grid>
              <Grid item xs={gridXs.button}>
                <ContainedButton
                  size={buttonSize}
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
