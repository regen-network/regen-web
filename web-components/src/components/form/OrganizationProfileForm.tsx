import React, { useState } from 'react';
import { Grid, makeStyles, Theme, Card } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import ControlledTextField from '../inputs/ControlledTextField';
import PhoneField from '../inputs/PhoneField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import Title from '../title';
import FormWrapCard from '../cards/FormWrapCard';

interface FormProps {
  onClose: () => void;
  onSubmit?: () => void;
  apiUrl: string;
}

interface Values {
  description: string | undefined;
  displayName: string;
  legalName: string;
  location: string;
  logo: string;
}

export default function MainForm({ onClose, onSubmit, apiUrl }: FormProps): JSX.Element {
  return (
    <Grid container alignItems="center" direction="column">
      <Title align="center" variant="h4">
        Organization Profile
      </Title>
      <Formik
        initialValues={{
          description: undefined,
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
        {({ values, submitForm, isSubmitting, isValid, submitCount, setFieldValue, status }) => {
          return (
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
          );
        }}
      </Formik>
    </Grid>
  );
}

// function OrganizationProfileForm(): JSX.Element {
//   const [isOrg, setOrg] = useState(false)
//   return (
//     <div>wowo</div>
//   )
// }
interface AccordionProps {
  children: React.ReactNode;
}
const Accordion = ({ children }: AccordionProps): JSX.Element => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <motion.header
        style={{ height: '30px', width: '100%' }}
        initial={false}
        animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
        onClick={() => setOpen(!isOpen)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
