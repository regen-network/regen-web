import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import Title from '../title';
import Submit from './Submit';

interface OrganizationProfileFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  description: string | undefined;
  displayName: string;
  legalName: string;
  location: string;
  logo: string;
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
    'div:nth-of-type(1)': {
      marginTop: 0,
    },
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

export default function OrganizationProfileForm({
  onClose,
  onSubmit,
  apiUrl,
}: OrganizationProfileFormProps): JSX.Element {
  const classes = useStyles();
  const initialValues: Values = {
    description: undefined,
    displayName: '',
    legalName: '',
    location: '',
    logo: '',
  };

  return (
    <Grid container alignItems="center" direction="column" className={classes.root}>
      <Title align="center" variant="h4">
        Organization Profile
      </Title>
      <Formik
        initialValues={initialValues}
        validate={(values: Values) => {
          const errors: Partial<Values> = {};
          if (!values.displayName) {
            errors.displayName = requiredMessage;
          }
          if (!values.legalName) {
            errors.legalName = requiredMessage;
          }
          if (!values.location) {
            errors.location = requiredMessage;
          }
          if (!values.logo) {
            errors.logo = requiredMessage;
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
                    description="This is the name of your farm, ranch, cooperative, non-profit, or other organization."
                    label="Organization legal name"
                    name="legalName"
                  />
                  <Field
                    className={classes.textField}
                    component={ControlledTextField}
                    description="This is the display name on your project page, if you choose to make this entity publically viewable."
                    label="Display name for organization"
                    name="displayName"
                  />
                  <Field
                    className={classes.textField}
                    component={ControlledTextField}
                    description="This address is used for issuing credits.  If you choose to show this entity on the project page, only city, state/province, and country will be displayed. "
                    label="Organization Location"
                    name="location"
                  />
                  <Field
                    className={classes.textField}
                    component={ImageField}
                    label="Organization Logo"
                    name="logo"
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
                    label="Short organization description"
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
