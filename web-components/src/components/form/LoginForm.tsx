import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ReCAPTCHA from 'react-google-recaptcha';

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
import { errors, SignupCode } from './errors';

interface LoginFormProps {
  link: string;
  privacyLink?: string;
  termsLink?: string;
  forgotPassword?: string;
  signup?: boolean;
  recaptchaSiteKey?: string;
  submit: (values: Values) => Promise<void>;
}

export interface Values {
  email: string;
  password: string;
  updates?: boolean;
  privacy?: boolean;
  recaptcha?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8.5),
    },
  },
  description: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  checkboxLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.25),
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6.25),
    },
  },
  recaptcha: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(7.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.75),
    },
  },
  checkboxes: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(11),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(6),
    },
  },
}));

const LoginForm: React.FC<LoginFormProps> = ({
  recaptchaSiteKey,
  signup = false,
  link,
  privacyLink,
  termsLink,
  submit,
}) => {
  const classes = useStyles();
  const label: string = signup ? 'Sign up' : 'Log in';

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        updates: false,
        privacy: false,
        staySigned: false,
        recaptcha: undefined,
      }}
      validate={(values: Values) => {
        const errors: {
          email?: string;
          password?: string;
          privacy?: string;
          recaptcha?: string;
        } = {};
        if (!values.email) {
          errors.email = requiredMessage;
        } else if (!validateEmail(values.email)) {
          errors.email = invalidEmailMessage;
        }
        if (!values.password) {
          errors.password = requiredMessage;
        }
        if (signup && !values.privacy) {
          errors.privacy = requirementAgreement;
        }
        if (signup && !validatePassword(values.password)) {
          errors.password = invalidPassword;
        }
        // TODO validate recaptcha as part of #350
        if (!signup && !values.recaptcha) {
          errors.recaptcha = requiredMessage;
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          const code: SignupCode | undefined = e.code;
          const errorMessage: string = code && code in errors ? errors[code] : e.toString();
          setStatus(errorMessage);
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, submitForm, isSubmitting, isValid, submitCount, setFieldValue, status }) => {
        return (
          <div>
            <Form>
              <OnBoardingCard>
                {signup ? (
                  <Description className={classes.description}>
                    If you've already signed up, <Link href={link}>log in here</Link>.
                  </Description>
                ) : (
                  <Description className={classes.description}>
                    Don't have an account? <Link href={link}>Sign up</Link>.
                  </Description>
                )}
                <Field component={TextField} type="email" label="Email address" name="email" />
                <Field
                  component={PasswordField}
                  className={classes.textField}
                  name="password"
                  signup={signup}
                />
                {!signup && <Description className={classes.forgotPassword}>Forgot password</Description>}
              </OnBoardingCard>
              <div className={classes.checkboxes}>
                {signup ? (
                  <>
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="updates"
                      label={
                        <Description className={classes.checkboxLabel}>
                          Please sign me up for the Regen news and updates (unsubscribe anytime)
                        </Description>
                      }
                    />
                    <Field
                      component={CheckboxLabel}
                      type="checkbox"
                      name="privacy"
                      label={
                        <Description className={classes.checkboxLabel}>
                          I agree to the Regen Network <Link href={privacyLink}>Privacy Policy</Link> and{' '}
                          <Link href={termsLink}>Terms of Service</Link>
                        </Description>
                      }
                    />
                  </>
                ) : (
                  <Field
                    component={CheckboxLabel}
                    type="checkbox"
                    name="staySigned"
                    label={<Description className={classes.checkboxLabel}>Stay signed in</Description>}
                  />
                )}
                {!signup && recaptchaSiteKey && (
                  <div className={classes.recaptcha}>
                    <ReCAPTCHA
                      onChange={value => setFieldValue('recaptcha', value)}
                      sitekey={recaptchaSiteKey}
                    />
                  </div>
                )}
              </div>
              <Grid container justify="flex-end">
                <ContainedButton
                  onClick={submitForm}
                  className={classes.button}
                  disabled={(submitCount > 0 && !isValid) || isSubmitting}
                >
                  {label}
                </ContainedButton>
              </Grid>
            </Form>
            {submitCount > 0 && !isSubmitting && status && <ErrorBanner text={status} />}
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
