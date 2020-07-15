import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field } from 'formik';

import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import TextField from 'web-components/lib/components/inputs/TextField';
import { requiredMessage } from 'web-components/lib/components/inputs/messages';
import NumberTextField from 'web-components/lib/components/inputs/NumberTextField';
import Submit from 'web-components/lib/components/form/Submit';

interface MoreInfoFormProps {
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4.75),
    },
  },
  form: {
    paddingTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(10),
  },
  textFields: {},
  textField: {
    marginTop: theme.spacing(8.25),
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
  submitButton: {
    textAlign: 'right',
  },
}));

export default function MoreInfoForm({
  onClose,
}: MoreInfoFormProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Title align="center" variant="h4" className={classes.title}>
        Yes, I’m interested in buying credits for myself or my organization!
      </Title>
      <Description align="center">
        Fill out the form below, and someone from our team will get back to you soon.
      </Description>
      <Formik
        initialValues={{
          budget: 1,
          name: '',
          orgName: '',
          email: '',
        }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = requiredMessage;
          } else if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,10})$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address';
          }
          if (!values.name) {
            errors.name = requiredMessage;
          }
          if (!values.budget) {
            errors.budget = requiredMessage;
          }
          return errors;
        }}
        onSubmit={async (
          { budget, email, name, orgName },
          { setSubmitting, setStatus },
        ) => {
          setSubmitting(true);
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, status }) => {
          return (
            <div>
              <Form className={classes.form} translate="yes">
                <div className={classes.textFields}>
                  <Field component={TextField} label="Your full name" name="name" />
                  <Field
                    component={TextField}
                    className={classes.textField}
                    type="email"
                    label="Your email address"
                    name="email"
                  />
                </div>
                <div className={classes.textFields}>
                  <Field
                    component={TextField}
                    name="orgName"
                    className={classes.textField}
                    label="Organization name"
                  />
                </div>
                <Grid container alignItems="center" className={classes.textField}>
                  <Grid item xs={6}>
                    <Field
                      component={NumberTextField}
                      name="budget"
                      min={1}
                      arrows={false}
                      label="Budget"
                      transformValue={(v: number): number => Math.max(1, v)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>USD</Typography>
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
