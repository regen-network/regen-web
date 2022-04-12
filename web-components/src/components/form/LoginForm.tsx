import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Formik, Form, Field } from 'formik';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Description from '../description';
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

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '& a': {
      cursor: 'pointer',
    },
  },
  checkboxLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  forgotPassword: {
    fontSize: theme.spacing(3.5),
    fontWeight: 700,
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3.75),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1.25),
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      marginRight: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6.25),
      marginRight: theme.spacing(2.5),
    },
  },
  recaptcha: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(7.75),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4.75),
    },
  },
  checkboxes: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(11),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(6),
    },
  },
}));

const LoginForm: React.FC<LoginFormProps> = ({
  signupFromLogin,
  loginFromSignup,
  privacyLink,
  termsLink,
  submit,
}) => {
  const classes = useStyles();
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
                {loginFromSignup ? (
                  <Description className={classes.description}>
                    If you've already signed up,{' '}
                    <Link onClick={loginFromSignup}>log in here</Link>.
                  </Description>
                ) : (
                  <Description className={classes.description}>
                    Don't have an account?{' '}
                    <Link href={signupFromLogin}>Sign up</Link>.
                  </Description>
                )}
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
                  <Description className={classes.forgotPassword}>
                    Forgot password
                  </Description>
                )}
              </OnBoardingCard>
              <div className={classes.checkboxes}>
                {loginFromSignup && (
                  <>
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="updates"
                      label={
                        <Description className={classes.checkboxLabel}>
                          Please sign me up for the Regen news and updates
                          (unsubscribe anytime)
                        </Description>
                      }
                    />
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="privacy"
                      label={
                        <Description className={classes.checkboxLabel}>
                          I agree to the Regen Network{' '}
                          <Link href={privacyLink}>Privacy Policy</Link> and{' '}
                          <Link href={termsLink}>Terms of Service</Link>
                        </Description>
                      }
                    />
                  </>
                )}
              </div>
              <Grid container justifyContent="flex-end">
                <ContainedButton
                  onClick={submitForm}
                  className={classes.button}
                  disabled={(submitCount > 0 && !isValid) || isSubmitting}
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
