import React, { useState } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, FormControl, RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';

import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import OnBoardingCard from '../cards/OnBoardingCard';
import FormLabel from './ControlledFormLabel';
import ContainedButton from '../buttons/ContainedButton';

interface FormProps {
  submit: (values: Values) => Promise<void>;
  goBack: () => void;
  skip: () => void;
  apiUrl: string;
}

interface Values {
  description?: string;
  displayName: string;
  legalName: string;
  location: string;
  logo: string;
}

type AcctType = 'personal' | 'organization';

const useStyles = makeStyles((theme: Theme) => ({
  topCard: {
    marginBottom: 0,
  },
  radio: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    margin: `${theme.spacing(4)} 0 0`,
  },
  radioActive: {
    backgroundColor: theme.palette.grey[50],
    transform: 'scale(1.015)',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
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
  cancelBtn: {
    color: theme.palette.grey[400],
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.grey[500],
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
}));

const OrganizationProfileForm: React.FC<FormProps> = ({ submit, apiUrl, goBack, skip }) => {
  const [acctType, setAcctType] = useState<AcctType>('personal');
  const classes = useStyles();
  const isPersonal = acctType === 'personal';
  const isOrg = acctType === 'organization';

  return (
    <Formik
      initialValues={{
        description: '',
        displayName: '',
        legalName: '',
        location: '',
        logo: '',
      }}
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
            <OnBoardingCard className={classes.topCard}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>Are you part of an organization?</FormLabel>
                <RadioGroup
                  aria-label="isOrganization"
                  name="isOrganization"
                  value={acctType}
                  onChange={({ target: { value } }) => setAcctType(value as AcctType)}
                >
                  <FormControlLabel
                    className={clsx(classes.radio, isPersonal && classes.radioActive)}
                    value="personal"
                    control={<Radio />}
                    label="No, I will register projects only as an individual"
                  />
                  <FormControlLabel
                    className={clsx(classes.radio, isOrg && classes.radioActive)}
                    value="organization"
                    control={<Radio />}
                    label="Yes, I am part of an organization which will be associated with my project(s)"
                  />
                </RadioGroup>
              </FormControl>
            </OnBoardingCard>
            <Accordion isOpen={acctType === 'organization'}>
              <OnBoardingCard>
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
                  className={classes.textField}
                  charLimit={160}
                  component={ControlledTextField}
                  description="Describe any relevant background and experience. This info may be shown on the project page."
                  label="Short organization description"
                  name="description"
                  rows={3}
                  multiline
                  optional
                />
              </OnBoardingCard>
            </Accordion>
            <Grid container justify="space-between">
              <ContainedButton
                variant="text"
                onClick={goBack}
                className={clsx(classes.cancelBtn, classes.button)}
              >
                Back
              </ContainedButton>
              <ContainedButton
                onClick={isPersonal ? skip : submitForm}
                className={classes.button}
                disabled={(submitCount > 0 && !isValid) || isSubmitting}
              >
                Next
              </ContainedButton>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface AccordionProps {
  children: React.ReactNode;
  isOpen: boolean;
}
const Accordion = ({ children, isOpen }: AccordionProps): JSX.Element => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto', scale: 1 },
            collapsed: { opacity: 0, height: 0, scale: 0.95 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default OrganizationProfileForm;
