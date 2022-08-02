import React from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string, AnyObjectSchema } from 'yup';

import Submit from './Submit';
import { invalidURL, requiredMessage } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import TextField from '../inputs/TextField';
import OnBoardingCard from '../cards/OnBoardingCard';
import { NameUrl } from '../../types/rdf';

export interface CertificationProps {
  onSubmit: (values: NameUrl) => void;
}

interface FormProps extends CertificationProps {
  onClose: RegenModalProps['onClose'];
}

const CertificationForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
  const initialValues: NameUrl = {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  };

  const urlSchema: AnyObjectSchema = object({
    '@type': string(),
    '@value': string().url(invalidURL),
  });

  const nameUrlSchema: AnyObjectSchema = object({
    'schema:name': string().required(requiredMessage),
    'schema:url': urlSchema,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={nameUrlSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <OnBoardingCard>
            <Field
              name="schema:name"
              label="Additional certification name"
              required
              component={TextField}
            />
            <Field
              name="schema:url.@value"
              label="Additional certification url"
              optional
              component={TextField}
            />
            <Submit
              isSubmitting={isSubmitting}
              onClose={onClose}
              status={status}
              isValid={isValid}
              submitCount={submitCount}
              submitForm={submitForm}
              label="save"
            />
          </OnBoardingCard>
        </Form>
      )}
    </Formik>
  );
};

export { CertificationForm };
