import React from 'react';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';

import Title from '../title';
import Description from '../description';
import TextField from '../inputs/TextField';
import ContainedButton from '../buttons/ContainedButton';
import EyeIcon from '../icons/EyeIcon';
import Card from '../cards/Card';
import CheckboxLabel from '../inputs/CheckboxLabel';
import { requiredMessage, validateEmail, invalidEmailMessage } from '../inputs/validation';

interface LoginFormProps {
  link: string;
  privacyLink?: string;
  termsLink?: string;
  forgotPassword?: string;
  signup?: boolean;
}

interface Values {
  email: string;
  password: string;
  updates?: boolean;
  privacy?: boolean;
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
  eyeIcon: {
    width: `${theme.spacing(4.75)} !important`,
    height: `${theme.spacing(4)} !important`,
    left: '2px',
    top: 'calc(50% - 7px)',
  },
  checkboxLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12.5),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8.75),
      paddingBottom: theme.spacing(20),
    },
  },
  form: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
  forgotPassword: {
    fontSize: theme.spacing(3.5),
    fontWeight: 700,
    color: theme.palette.secondary.main,
    float: 'right',
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(9)} 0 ${theme.spacing(12)}`,
      padding: `${theme.spacing(13.5)} ${theme.spacing(10)} ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(6.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
      padding: `${theme.spacing(8.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
  },
}));

const LoginForm: React.FC<LoginFormProps> = ({ signup = false, link, privacyLink, termsLink }) => {
  const classes = useStyles();
  const theme = useTheme();
  const label: string = signup ? 'Sign up' : 'Log in';

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Title variant="h3" align="center">
        {label}
      </Title>
      <Formik
        initialValues={{
          email: '',
          password: '',
          updates: false,
          privacy: false,
          showPassword: false,
          stay: false,
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
          if (signup && !values.privacy) {
            errors.privacy = requiredMessage;
          }
          return errors;
        }}
        onSubmit={({ email, password, updates, privacy }, { setSubmitting, setStatus }) => {
          // setSubmitting(true);
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, setFieldValue, status }) => {
          return (
            <Form className={classes.form}>
              <Card className={classes.card}>
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
                  component={TextField}
                  className={classes.textField}
                  type={values.showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setFieldValue('showPassword', !values.showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <EyeIcon
                        className={classes.eyeIcon}
                        color={theme.palette.secondary.dark}
                        visible={values.showPassword}
                      />
                    </IconButton>
                  }
                />
                {!signup && <div className={classes.forgotPassword}>Forgot password</div>}
              </Card>
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
                  name="stay"
                  label={<Description className={classes.checkboxLabel}>Stay signed in</Description>}
                />
              )}
              <ContainedButton disabled={(submitCount > 0 && !isValid) || isSubmitting}>
                {label}
              </ContainedButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
