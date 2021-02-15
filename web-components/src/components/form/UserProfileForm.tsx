import React from 'react';
import { Grid } from '@material-ui/core';
import { Formik, Field } from 'formik';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import Title from '../title';
import { requiredMessage } from '../inputs/validation';
import FormWrapCard from '../cards/FormWrapCard';

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

export default function UserProfileForm({ onClose, onSubmit, apiUrl }: UserProfileFormProps): JSX.Element {
  return (
    <Grid container alignItems="center" direction="column">
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
            <FormWrapCard onSubmit={submitForm} submitDisabled={isSubmitting}>
              <Field component={ControlledTextField} label="Full name" name="name" />
              <Field component={ControlledTextField} name="role" label="Role" />
              <Field component={ImageField} label="Bio Photo" name="bioPhoto" optional />
              <Field component={PhoneField} label="Phone number" name="phone" optional />
              <Field
                charLimit={160}
                component={ControlledTextField}
                description="Describe any relevant background and experience. This info may be shown on the project page."
                label="Short personal description"
                name="description"
                rows={3}
                multiline
                optional
              />
            </FormWrapCard>
          );
        }}
      </Formik>
    </Grid>
  );
}
