import React from 'react';
import { Avatar, Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import TextField from '../inputs/TextField';
import PhoneInputField from '../inputs/PhoneInputField';
import Title from '../title';
import Submit from './Submit';
import OutlinedButton from '../buttons/OutlinedButton';

interface UserProfileFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  name: string;
  photo: string | undefined;
  phone: number | undefined;
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
  avatar: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(20),
      width: theme.spacing(20),
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
      marginRight: theme.spacing(3),
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
          phone: undefined,
          photo: undefined,
          description: '',
        }}
        validate={(values: Values) => {
          return {};
        }}
        onSubmit={({ name, phone, description }, { setSubmitting, setStatus }) => {
          setSubmitting(true);
          console.log('TODO: handle submit'); // eslint-disable-line
        }}
      >
        {({ values, errors, submitForm, isSubmitting, isValid, submitCount, setFieldValue, status }) => {
          console.log(values); //eslint-disable-line
          return (
            <>
              <div className={classes.formWrap}>
                <Form className={classes.form} translate="yes">
                  <Field component={TextField} className={classes.textField} label="Full name" name="name" />

                  <Field
                    component={TextField}
                    name="role"
                    className={classes.textField}
                    label="Role"
                    // optional
                  />
                  {/* TODO: the following will likely be replaced once the photo upload component is done and we can integrate with formik */}
                  <>
                    <h4>Bio Photo (optional)</h4>
                    <Box display="flex" alignItems="center">
                      <Avatar className={classes.avatar} />
                      <div>
                        <OutlinedButton>Upload Photo</OutlinedButton>
                      </div>
                    </Box>
                  </>

                  <Field
                    // component={TextField}
                    component={PhoneInputField}
                    className={classes.textField}
                    label="Phone number"
                    name="phone"
                    optional
                  />
                  <Field
                    component={TextField}
                    name="description"
                    className={classes.textField}
                    label="Short personal description"
                    optional
                  />
                </Form>
              </div>

              <Submit
                label="Next"
                isSubmitting={isSubmitting}
                onClose={onClose}
                status={status}
                isValid={isValid}
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
