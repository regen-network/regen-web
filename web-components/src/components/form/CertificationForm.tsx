import React from 'react';
import { Field, Form, Formik } from 'formik';
import { AnyObjectSchema, object, string } from 'yup';

import OnBoardingCard from '../cards/OnBoardingCard';
import TextField from '../inputs/TextField';
import { invalidURL, requiredMessage } from '../inputs/validation';
import { RegenModalProps } from '../modal';
import Submit from './Submit';

// TODO: types URL and NameUrl
// this has been temporarily duplicated due to moving the RDF types to the web-registry app
interface URL {
  '@type': 'http://schema.org/URL' | 'schema:URL';
  '@value': string;
}
interface NameUrl {
  'schema:name': string;
  'schema:url': URL;
}

export interface CertificationProps {
  onSubmit: (values: NameUrl) => void;
}

interface FormProps extends CertificationProps {
  onClose: RegenModalProps['onClose'];
}

const CertificationForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  onClose,
  onSubmit,
}) => {
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
