import React from 'react';
import Grid from '@mui/material/Grid';
import { DefaultTheme as Theme } from '@mui/styles';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from 'tss-react/mui';

import CheckboxGroup from '../inputs/CheckboxGroup';
import SelectTextField from '../inputs/SelectTextField';
import TextField from '../inputs/TextField';
import {
  invalidEmailMessage,
  requiredMessage,
  validateEmail,
} from '../inputs/validation';
import { Body, Title } from '../typography';
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

const useStyles = makeStyles()((theme: Theme) => ({
  form: {
    paddingTop: theme.spacing(7.5),
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
  const { classes } = useStyles();
  return (
    <div>
      <Title align="center" variant="h4" sx={{ mb: [4.75, 5] }}>
        Yes, I’m interested in buying credits for myself or my organization!
      </Title>
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
                    <Body sx={{ mt: 7, ml: [2.75, 4.875] }}>USD</Body>
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
