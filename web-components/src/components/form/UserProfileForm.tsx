import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';

interface UserProfileFormProps {
  submit: (values: Values) => Promise<void>;
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
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6.25),
    },
  },
  textField: {
    '&:first-of-type': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
}));

const UserProfileForm: React.FC<UserProfileFormProps> = ({ submit, apiUrl }) => {
  const classes = useStyles();
  return (
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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid, submitCount }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                className={classes.textField}
                component={ControlledTextField}
                label="Full name"
                name="name"
              />
              <Field className={classes.textField} component={ControlledTextField} name="role" label="Role" />
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
                className={classes.textField}
                charLimit={160}
                component={ControlledTextField}
                description="Describe any relevant background and experience. This info may be shown on the project page."
                label="Short personal description"
                name="description"
                rows={3}
                multiline
                optional
              />

              <Grid container justify="flex-end">
                <ContainedButton
                  onClick={submitForm}
                  className={classes.button}
                  disabled={(submitCount > 0 && !isValid) || isSubmitting}
                >
                  Next
                </ContainedButton>
              </Grid>
            </OnBoardingCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserProfileForm;
