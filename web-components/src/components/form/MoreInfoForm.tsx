import React from 'react';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
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
  title: string;
  nameLabel: string;
  emailLabel: string;
  orgNameLabel: string;
  budgetLabel: string;
  usdText: string;
  projectTypesLabel: string;
  protecTypesOptions: { label: string; value: string }[];
  onBehalfOfLabel: string;
  onBehalfOfOptions: { label: string; value: string }[];
  submitLabel: string;
  submitErrorText: string;
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
  title,
  budgetLabel,
  nameLabel,
  emailLabel,
  orgNameLabel,
  projectTypesLabel,
  onBehalfOfLabel,
  usdText,
  protecTypesOptions,
  onBehalfOfOptions,
  submitLabel,
  submitErrorText,
  onClose,
  onSubmit,
  apiUrl,
}: MoreInfoFormProps): JSX.Element {
  const { classes } = useStyles();
  return (
    <div>
      <Title align="center" variant="h4" sx={{ mb: [4.75, 5] }}>
        {title}
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
            .post(`${apiUri}/marketplace/v1/buyers-info`, {
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
                <Field component={TextField} label={nameLabel} name="name" />
                <Field
                  component={TextField}
                  type="email"
                  label={emailLabel}
                  name="email"
                />
                <Field
                  component={TextField}
                  name="orgName"
                  label={orgNameLabel}
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
                      label={budgetLabel}
                      name="budget"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Body sx={{ mt: 7, ml: [2.75, 4.875] }}>{usdText}</Body>
                  </Grid>
                </Grid>
                <Field
                  component={CheckboxGroup}
                  name="projectTypes"
                  className={classes.textField}
                  label={projectTypesLabel}
                  options={protecTypesOptions}
                />
                <Field
                  options={onBehalfOfOptions}
                  component={SelectTextField}
                  label={onBehalfOfLabel}
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
                label={submitLabel}
                errorText={submitErrorText}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
