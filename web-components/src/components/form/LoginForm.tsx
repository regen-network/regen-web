import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Link, Grid } from '@mui/material';

import TextField from '../inputs/TextField';
import PasswordField from '../inputs/PasswordField';
import ErrorBanner from '../banner/ErrorBanner';
import ContainedButton from '../buttons/ContainedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import CheckboxLabel from '../inputs/CheckboxLabel';
import {
  invalidPassword,
  validatePassword,
  requiredMessage,
  requirementAgreement,
  validateEmail,
  invalidEmailMessage,
} from '../inputs/validation';
import {
  errors,
  SignupCode,
  LoginCode,
  getErrorMessage,
  isAuth0Error,
} from './errors';
import { Body, Subtitle } from '../typography';

interface LoginFormProps {
  signupFromLogin?: string; // link to loginFromSignup page
  loginFromSignup?: () => Promise<void>; // auth0 loginWithRedirect
  privacyLink?: string;
  termsLink?: string;
  forgotPassword?: string;
  submit: (values: Values) => Promise<void>;
}

export interface Values {
  email: string;
  password: string;
  updates?: boolean;
  privacy?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  signupFromLogin,
  loginFromSignup,
  privacyLink,
  termsLink,
  submit,
}) => {
  const label: string = loginFromSignup ? 'Sign up' : 'Log in';

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        updates: false,
        privacy: false,
        staySigned: false,
      }}
      validate={(values: Values) => {
        const errors: {
          email?: string;
          password?: string;
          privacy?: string;
        } = {};
        if (!values.email) {
          errors.email = requiredMessage;
        } else if (!validateEmail(values.email)) {
          errors.email = invalidEmailMessage;
        }
        if (!values.password) {
          errors.password = requiredMessage;
        }
        if (loginFromSignup && !values.privacy) {
          errors.privacy = requirementAgreement;
        }
        if (loginFromSignup && !validatePassword(values.password)) {
          errors.password = invalidPassword;
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true);

        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          if (isAuth0Error(e)) {
            const code = e.code as LoginCode | SignupCode | undefined;
            let errorMessage: string =
              code && code in errors ? errors[code] : e.toString();
            if (e.description === 'Wrong email or password.') {
              errorMessage = errors.invalid_user_password;
            }
            setStatus(errorMessage);
          } else if (e instanceof Error) {
            setStatus(getErrorMessage(e.message));
          }
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        submitForm,
        isSubmitting,
        isValid,
        submitCount,
        setFieldValue,
        status,
      }) => {
        return (
          <div>
            <Form>
              <OnBoardingCard>
                <Body size="lg" mb={5}>
                  {loginFromSignup ? (
                    <>
                      If you've already signed up,{' '}
                      <Link onClick={loginFromSignup}>log in here</Link>.
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <Link href={signupFromLogin}>Sign up</Link>.
                    </>
                  )}
                </Body>
                <Field
                  component={TextField}
                  type="email"
                  label="Email address"
                  name="email"
                  defaultStyle={false}
                />
                <Field
                  component={PasswordField}
                  name="password"
                  loginFromSignup={loginFromSignup}
                />
                {!loginFromSignup && (
                  <Subtitle
                    size="sm"
                    sx={{
                      color: 'secondary.main',
                      cursor: 'pointer',
                      float: 'right',
                      pt: [1.25, 3.75],
                    }}
                  >
                    Forgot password
                  </Subtitle>
                )}
              </OnBoardingCard>
              <Box sx={{ pl: [6, 11] }}>
                {loginFromSignup && (
                  <>
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="updates"
                      label={
                        <Body size="sm">
                          Please sign me up for the Regen news and updates
                          (unsubscribe anytime)
                        </Body>
                      }
                    />
                    <Box py={1} />
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="privacy"
                      label={
                        <Body size="sm">
                          I agree to the Regen Network{' '}
                          <Link href={privacyLink}>Privacy Policy</Link> and{' '}
                          <Link href={termsLink}>Terms of Service</Link>
                        </Body>
                      }
                    />
                  </>
                )}
              </Box>
              <Grid container justifyContent="flex-end">
                <ContainedButton
                  onClick={submitForm}
                  disabled={(submitCount > 0 && !isValid) || isSubmitting}
                  sx={{ mt: [6.25, 8], mr: [2.5, 10] }}
                >
                  {label}
                </ContainedButton>
              </Grid>
            </Form>
            {submitCount > 0 && !isSubmitting && status && (
              <ErrorBanner text={status} />
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
