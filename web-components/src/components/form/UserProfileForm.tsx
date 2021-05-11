import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import OnBoardingCard from '../cards/OnBoardingCard';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import { OnboardingSubmit } from './OnboardingSubmit';

interface UserProfileFormProps {
  initialValues?: UserProfileValues;
  submit: (values: UserProfileValues) => Promise<void>;
}

export interface UserProfileValues {
  name: string;
  roleTitle: string;
  photo?: string;
  phone?: string;
  description?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '&:first-of-type': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.5),
    },
  },
}));

const UserProfileForm: React.FC<UserProfileFormProps> = ({ submit, initialValues }) => {
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize
      initialValues={
        initialValues || {
          name: '',
          roleTitle: '',
          photo: '',
          phone: '',
          description: '',
        }
      }
      validate={(values: UserProfileValues) => {
        const errors: Partial<UserProfileValues> = {};
        const errorFields: Array<keyof UserProfileValues> = ['name', 'roleTitle'];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = requiredMessage;
          }
        });
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
              <Field
                className={classes.textField}
                component={ControlledTextField}
                name="roleTitle"
                label="Role"
                placeholder="i.e. Farmer, Conservationist, Manager, etc."
              />
              <Field
                className={classes.textField}
                component={ImageField}
                label="Bio photo"
                name="photo"
                optional
              />
              <Field
                className={classes.textField}
                component={PhoneField}
                placeholder="+1 719 200 3488"
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
            </OnBoardingCard>
            <OnboardingSubmit
              onSubmit={submitForm}
              disabled={(submitCount > 0 && !isValid) || isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserProfileForm;
