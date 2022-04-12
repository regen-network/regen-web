import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import Title from '../title';
import TextField from '../inputs/TextField';
import {
  requiredMessage,
  validateEmail,
  invalidEmailMessage,
} from '../inputs/validation';
import CheckboxGroup from '../inputs/CheckboxGroup';
import SelectTextField from '../inputs/SelectTextField';
import Submit from './Submit';

interface MoreInfoFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  budget: string;
  email: string;
  name: string;
  orgName: string;
  projectTypes: string[];
  onBehalfOf: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4.75),
    },
  },
  form: {
    paddingTop: theme.spacing(7.5),
  },
  usd: {
    fontSize: theme.spacing(4),
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4.875),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2.75),
    },
  },
  textField: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.typography.pxToRem(40),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.typography.pxToRem(33),
    },
  },
}));

export default function MoreInfoForm({
  onClose,
  onSubmit,
  apiUrl,
}: MoreInfoFormProps): JSX.Element {
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
          budget: '',
          name: '',
          orgName: '',
          email: '',
          projectTypes: [],
          onBehalfOf: '',
        }}
        validate={(values: Values) => {
          const errors: {
            email?: string;
            name?: string;
            budget?: string;
            onBehalfOf?: string;
            projectTypes?: string;
          } = {};
          if (!values.email) {
            errors.email = requiredMessage;
          } else if (!validateEmail(values.email)) {
            errors.email = invalidEmailMessage;
          }
          if (!values.name) {
            errors.name = requiredMessage;
          }
          if (!values.budget) {
            errors.budget = requiredMessage;
          }
          if (!values.onBehalfOf) {
            errors.onBehalfOf = requiredMessage;
          }
          if (!values.projectTypes.length) {
            errors.projectTypes = requiredMessage;
          }
          return errors;
        }}
        onSubmit={(
          { budget, email, name, orgName, onBehalfOf, projectTypes },
          { setSubmitting, setStatus },
        ) => {
          setSubmitting(true);
          const apiUri: string = apiUrl;
          axios
            .post(`${apiUri}/buyers-info`, {
              budget,
              email,
              name,
              projectTypes,
              onBehalfOf,
            })
            .then(resp => {
              setSubmitting(false);
              if (onSubmit) {
                onSubmit();
              }
            })
            .catch(e => {
              /* eslint-disable no-console */
              console.error(e);
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
          return (
            <div>
              <Form className={classes.form} translate="yes">
                <Field
                  component={TextField}
                  label="Your full name"
                  name="name"
                />
                <Field
                  component={TextField}
                  type="email"
                  label="Your email address"
                  name="email"
                />
                <Field
                  component={TextField}
                  name="orgName"
                  label="Organization name"
                  optional
                />
                <Grid
                  container
                  alignItems="center"
                  className={classes.textField}
                >
                  <Grid item xs={6}>
                    <Field
                      options={[
                        { value: '', label: '' },
                        { value: '<$500', label: '<$500' },
                        { value: '$501 - $1,000', label: '$501 - $1,000' },
                        { value: '$1,001 - $5,000', label: '$1,001 - $5,000' },
                        {
                          value: '$5,001 - $10,000',
                          label: '$5,001 - $10,000',
                        },
                        {
                          value: '$10,001 - $50,000',
                          label: '$10,001 - $50,000',
                        },
                        {
                          value: '$50,001 - $100,000',
                          label: '$50,001 - $100,000',
                        },
                        {
                          value: '$100,001 - $500,000',
                          label: '$100,001 - $500,000',
                        },
                        { value: '$500,001+', label: '$500,001+' },
                      ]}
                      component={SelectTextField}
                      label="Budget"
                      name="budget"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.usd}>USD</Typography>
                  </Grid>
                </Grid>
                <Field
                  component={CheckboxGroup}
                  name="projectTypes"
                  className={classes.textField}
                  label="Which types of carbon credits projects are you interested in?"
                  options={[
                    {
                      label: 'All nature based carbon credits',
                      value: 'All nature based carbon credits',
                    },
                    {
                      label: 'Forestry-based credits',
                      value: 'Forestry-based credits',
                    },
                    {
                      label: 'Grasslands-based credits',
                      value: 'Grasslands-based credits',
                    },
                    {
                      label: 'Cropland-based credits',
                      value: 'Cropland-based credits',
                    },
                  ]}
                />
                <Field
                  options={[
                    {
                      label: '',
                      value: '',
                    },
                    {
                      label: 'Consumer/Individual/myself',
                      value: 'Consumer/Individual/myself',
                    },
                    {
                      label: 'Small or Medium Sized Business',
                      value: 'Small or Medium Sized Business',
                    },
                    {
                      label: 'Nonprofit',
                      value: 'Nonprofit',
                    },
                    {
                      label: 'Large Corporation',
                      value: 'Large Corporation',
                    },
                    {
                      label: 'Crypto Organization',
                      value: 'Crypto Organization',
                    },
                  ]}
                  component={SelectTextField}
                  label="I am interested in buying carbon credits on behalf of:"
                  name="onBehalfOf"
                />
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
