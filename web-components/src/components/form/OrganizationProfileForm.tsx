import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Card,
  Theme,
  makeStyles,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Formik, Field } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import Title from '../title';
import FormWrapCard from '../cards/FormWrapCard';
import FormLabel from './ControlledFormLabel';

interface FormProps {
  onClose: () => void;
  onSubmit?: () => void;
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
  orgType: {
    marginBottom: 0,
    maxWidth: theme.spacing(140),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(9),
      padding: `${theme.spacing(13.5)} ${theme.spacing(10)} ${theme.spacing(12.5)}`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(6.5)} ${theme.spacing(2.5)} 0`,
      padding: `${theme.spacing(8.5)} ${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
  },
  radio: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    margin: `${theme.spacing(4)} 0 0`,
    transition: '300ms ease-in-out',
  },
  radioActive: {
    backgroundColor: theme.palette.grey[50],
    border: `2px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
}));

export default function OrganizationProfileForm({ onClose, onSubmit, apiUrl }: FormProps): JSX.Element {
  const [acctType, setAcctType] = useState<AcctType>('personal');
  const classes = useStyles();
  return (
    <Grid container alignItems="center" direction="column">
      <Title align="center" variant="h4">
        Organization Profile
      </Title>
      <Card className={classes.orgType}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel>Are you part of an organization?</FormLabel>
          <RadioGroup
            aria-label="isOrganization"
            name="isOrganization"
            value={acctType}
            onChange={({ target: { value } }) => setAcctType(value as AcctType)}
          >
            <FormControlLabel
              className={clsx(classes.radio, acctType === 'personal' && classes.radioActive)}
              value="personal"
              control={<Radio />}
              label="No, I will register projects only as an individual"
            />
            <FormControlLabel
              className={clsx(classes.radio, acctType === 'organization' && classes.radioActive)}
              value="organization"
              control={<Radio />}
              label="Yes, I am part of an organization which will be associated with my project(s)"
            />
          </RadioGroup>
        </FormControl>
      </Card>
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
        onSubmit={(values, { setSubmitting, setStatus }) => {
          // setSubmitting(true);
          console.log('TODO: handle submit'); // eslint-disable-line
          console.log('form values: ', values); //eslint-disable-line
        }}
      >
        {({ submitForm, isSubmitting }) => {
          return (
            <Accordion isOpen={acctType === 'organization'}>
              <FormWrapCard onSubmit={submitForm} onCancel={() => null} submitDisabled={isSubmitting}>
                <Field
                  component={ControlledTextField}
                  description="This is the name of your farm, ranch, cooperative, non-profit, or other organization."
                  label="Organization legal name"
                  name="legalName"
                />
                <Field
                  component={ControlledTextField}
                  description="This is the display name on your project page, if you choose to make this entity publically viewable."
                  label="Display name for organization"
                  name="displayName"
                />
                <Field
                  component={ControlledTextField}
                  description="This address is used for issuing credits.  If you choose to show this entity on the project page, only city, state/province, and country will be displayed. "
                  label="Organization Location"
                  name="location"
                />
                <Field component={ImageField} label="Organization Logo" name="logo" />
                <Field component={PhoneField} label="Phone number" name="phone" optional />
                <Field
                  charLimit={160}
                  component={ControlledTextField}
                  description="Describe any relevant background and experience. This info may be shown on the project page."
                  label="Short organization description"
                  name="description"
                  rows={3}
                  multiline
                  optional
                />
              </FormWrapCard>
            </Accordion>
          );
        }}
      </Formik>
    </Grid>
  );
}

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
