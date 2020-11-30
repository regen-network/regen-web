import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import Title from '../title';
import TextField from '../inputs/TextField';
import { requiredMessage, validateEmail, invalidEmailMessage } from '../inputs/validation';
import NumberTextField from '../inputs/NumberTextField';
import Submit from './Submit';

interface MoreInfoFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  budget: number | undefined;
  email: string;
  name: string;
  orgName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4.75),
    },
  },
  form: {
    paddingTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(10),
  },
  usd: {
    fontSize: theme.spacing(4),
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4.875),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2.75),
    },
  },
  textField: {
    marginTop: theme.spacing(8.25),
  },
}));

export default function MoreInfoForm({ onClose, onSubmit, apiUrl }: MoreInfoFormProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Title align="center" variant="h4" className={classes.title}>
        Yes, I’m interested in buying credits for myself or my organization!
      </Title>
      {/* <Description align="center">
        Fill out the form below, and someone from our team will get back to you soon.
      </Description> */}
      <Formik
        initialValues={{
          budget: undefined,
          name: '',
          orgName: '',
          email: '',
        }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = requiredMessage;
          } else if (!validateEmail(values.email)) {
            errors.email = invalidEmailMessage;
          }
          if (!values.name) {
            errors.name = requiredMessage;
          }
          return errors;
        }}
        onSubmit={({ budget, email, name, orgName }, { setSubmitting, setStatus }) => {
          setSubmitting(true);
          const apiUri: string = apiUrl;
          axios
            .post(`${apiUri}/buyers-info`, {
              budget,
              email,
              name,
              orgName,
            })
            .then(resp => {
              setSubmitting(false);
              if (onSubmit) {
                onSubmit();
              }
            })
            .catch(e => {
              /* eslint-disable-next-line */
              console.log(e);
              setSubmitting(false);
            });
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, status }) => {
          return (
            <div>
              <Form className={classes.form} translate="yes">
                <div>
                  <Field component={TextField} label="Your full name" name="name" />
                  <Field
                    component={TextField}
                    className={classes.textField}
                    type="email"
                    label="Your email address"
                    name="email"
                  />
                </div>
                <div>
                  <Field
                    component={TextField}
                    name="orgName"
                    className={classes.textField}
                    label="Organization name"
                    optional
                  />
                </div>
                <Grid container alignItems="center" className={classes.textField}>
                  <Grid item xs={6}>
                    <Field
                      component={NumberTextField}
                      name="budget"
                      adornment="$"
                      min={1}
                      arrows={false}
                      label="Budget"
                      transformValue={(v: number): number => Math.max(1, v)}
                      optional
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.usd}>USD</Typography>
                  </Grid>
                </Grid>
              </Form>
              <Submit
                isSubmitting={isSubmitting}
                onClose={onClose}
                status={status}
                isValid={isValid}
                submitCount={submitCount}
                submitForm={submitForm}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
