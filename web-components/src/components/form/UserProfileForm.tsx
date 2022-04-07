import React from 'react';
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

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  submit,
  initialValues,
}) => {
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
        const errorFields: Array<keyof UserProfileValues> = [
          'name',
          'roleTitle',
        ];
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
                component={ControlledTextField}
                label="Full name"
                name="name"
              />
              <Field
                component={ControlledTextField}
                name="roleTitle"
                label="Role"
                placeholder="i.e. Farmer, Conservationist, Manager, etc."
              />
              <Field
                component={ImageField}
                label="Bio photo"
                name="photo"
                optional
              />
              <Field
                component={PhoneField}
                placeholder="+1 719 200 3488"
                label="Phone number"
                name="phone"
                optional
              />
              <Field
                charLimit={160}
                component={ControlledTextField}
                description="Describe any relevant background and experience. This info may be shown on the project page."
                label="Short personal description"
                name="description"
                rows={3}
                minRows={3}
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
