import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import TextField from '../inputs/TextField';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import Title from '../title';
import Submit from './Submit';
import { requiredMessage } from '../inputs/validation';

interface UserProfileFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  name: string;
  role: string;
  photo: string | undefined;
  phone: string | undefined;
  description: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 560,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'stretch',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4.75),
    },
  },
  formWrap: {
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    backgroundColor: '#FFFFFF',
    border: '1px solid #EFEFEF',
    borderRadius: 3,
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

export default function UserProfileForm({ onClose, onSubmit, apiUrl }: UserProfileFormProps): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" direction="column" className={classes.root}>
      <Title align="center" variant="h4">
        User Profile
      </Title>
      <Formik
        initialValues={{
          name: '',
          role: '',
          photo: undefined,
          phone: undefined,
          description: undefined,
        }}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.name) {
            errors.name = requiredMessage;
          }
          if (!values.role) {
            errors.role = requiredMessage;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          // setSubmitting(true);
          console.log('TODO: handle submit'); // eslint-disable-line
          console.log('form values: ', values); //eslint-disable-line
        }}
      >
        {({ values, submitForm, isSubmitting, isValid, submitCount, setFieldValue, status }) => {
          return (
            <>
              <div className={classes.formWrap}>
                <Form className={classes.form} translate="yes">
                  <Field
                    className={classes.textField}
                    component={ControlledTextField}
                    label="Full name"
                    name="name"
                  />
                  {/* TODO: I'm leaving this as a `TextField` to demo styles are the same, but they should probably use the same component */}
                  <Field component={TextField} name="role" className={classes.textField} label="Role" />
                  <Field
                    className={classes.textField}
                    component={ImageField}
                    label="Bio Photo"
                    name="bioPhoto"
                    optional
                  />
                  <Field
                    className={classes.textField}
                    component={PhoneField}
                    label="Phone number"
                    name="phone"
                    optional
                  />
                  <Field
                    charLimit={160}
                    className={classes.textField}
                    component={ControlledTextField}
                    description="Describe any relevant background and experience. This info may be shown on the project page."
                    label="Short personal description"
                    name="description"
                    rows={3}
                    multiline
                    optional
                  />
                </Form>
              </div>

              <Submit
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="Next"
                onClose={onClose}
                status={status}
                submitCount={submitCount}
                submitForm={submitForm}
              />
            </>
          );
        }}
      </Formik>
    </Grid>
  );
}
